import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';
import { UserService } from '../../models/userServiceModel.js';
import { Service } from '../../models/serviceModel.js';
import jwt from 'jsonwebtoken';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/oauth/google/callback",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Try to find an existing oauth account for this provider user id
        const provider = 'google';
        const providerUserId = profile.id;
        const no = false;

        // Only verify JWT if a token is present in cookies. Do not call jwt.verify with undefined.
        const tokenFromCookie = req && req.cookies && req.cookies.token;
        if (tokenFromCookie) {
            try {
                const decoded = jwt.verify(tokenFromCookie, process.env.JWT_SECRET);
                req.user = decoded;
            } catch (e) {
                no = true;
            }
        }

        let oauthAccount = await OAuthAccount.findOne({ where: { provider, provider_user_id: providerUserId } });

        // If OAuthAccount exists, update tokens and return linked user
        if (oauthAccount) {
            await oauthAccount.update({
                access_token: accessToken || oauthAccount.access_token,
                refresh_token: refreshToken || oauthAccount.refresh_token,
                // expires_at left null unless you calculate expiry from token response
            });

            const user = await User.findByPk(oauthAccount.user_id);
            if (user) {
                const token = jwt.sign({ userIdx: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    // use req.res.cookie when available (passport strategy doesn't receive res directly)
                    if (req && req.res && typeof req.res.cookie === 'function') {
                        req.res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 60 * 60 * 1000 });
                    }
                    return done(null, user);
            }
            // If linked user deleted, remove oauthAccount and fall through to create flow
            await oauthAccount.destroy();
        }

        // If user is not authenticated, create a new user
        if (!req.user || no) {
            // Create new user
            const email = profile.emails && profile.emails[0] && profile.emails[0].value;
            const name = profile.displayName || (profile.name && `${profile.name.givenName} ${profile.name.familyName}`) || 'Shrek';
            const newUser = await User.create({
                email: email, name: name, password_hash: null, role: 'user', login_service_id : (await Service.findOne({ where: { name: provider } })).id
            });

            // Create OAuthAccount linked to new user
            oauthAccount = await OAuthAccount.create({
                user_id: newUser.id,
                provider,
                provider_user_id: providerUserId,
                access_token: accessToken,
                refresh_token: refreshToken
            });

            // Link UserService
            await UserService.create({
                user_id: newUser.id,
                service_id: (await Service.findOne({ where: { name: provider } })).id,
                oauth_account_id: oauthAccount.id
            });

            const token = jwt.sign({ userId: newUser.id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            if (req && req.res && typeof req.res.cookie === 'function') {
                req.res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 60 * 60 * 1000 });
            }

            return done(null, newUser);
        }

        // If user is already signed in, link the provider to that user
        if (req && req.user) {
            const email = profile.emails && profile.emails[0] && profile.emails[0].value;
            if (email) {
                const existingUser = await User.findOne({ where: { email } });
                if (existingUser && existingUser.id !== req.user.userId) {
                    // Email conflict - another user has this email
                    return done(new Error('Email already in use by another account'));
                }
            }

            const currentUser = req.user;
            oauthAccount = await OAuthAccount.create({
                user_id: currentUser.userId,
                provider,
                provider_user_id: providerUserId,
                access_token: accessToken,
                refresh_token: refreshToken
            });
            await UserService.create({
                user_id: currentUser.userId,
                service_id: (await Service.findOne({ where: { name: provider } })).id,
                oauth_account_id: oauthAccount.id
            });
            return done(null, currentUser);
        } else {
            return done(new Error('User not authenticated'));
        }
    } catch (err) {
        return done(err);
    }
}));

export const googleAuthOptions = {
    scope: ['openid', 'profile', 'email'],
    accessType: 'offline',
    prompt: 'consent'
};
