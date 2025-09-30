import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Try to find an existing oauth account for this provider user id
        const provider = 'google';
        const providerUserId = profile.id;

        let oauthAccount = await OAuthAccount.findOne({ where: { provider, provider_user_id: providerUserId } });

        // If OAuthAccount exists, update tokens and return linked user
        if (oauthAccount) {
            await oauthAccount.update({
                access_token: accessToken || oauthAccount.access_token,
                refresh_token: refreshToken || oauthAccount.refresh_token,
                // expires_at left null unless you calculate expiry from token response
            });

            const user = await User.findByPk(oauthAccount.user_id);
            if (user) return done(null, user);
            // If linked user deleted, remove oauthAccount and fall through to create flow
            await oauthAccount.destroy();
        }

        // If user is already signed in, link the provider to that user
        if (req && req.user) {
            const currentUser = req.user;
            oauthAccount = await OAuthAccount.create({
                user_id: currentUser.id,
                provider,
                provider_user_id: providerUserId,
                access_token: accessToken,
                refresh_token: refreshToken
            });
            return done(null, currentUser);
        }

        // Otherwise, try to find a local user by email
        const email = Array.isArray(profile.emails) && profile.emails.length ? profile.emails[0].value : null;
        let user = null;

        if (email) {
            user = await User.findOne({ where: { email } });
        }

        // If no user, create one (minimal fields). Assumption: provider email is verified.
        if (!user) {
            const name = profile.displayName || (profile.name && `${profile.name.givenName || ''} ${profile.name.familyName || ''}`).trim() || 'Unnamed';
            user = await User.create({
                email: email || null,
                name,
                is_verified: !!email // assume verified if email present
            });
        }

        // Create the OAuthAccount linked to the user
        await OAuthAccount.create({
            user_id: user.id,
            provider,
            provider_user_id: providerUserId,
            access_token: accessToken,
            refresh_token: refreshToken
        });

        // Return the persisted user so serializeUser stores only user.id
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

export const googleAuthOptions = {
    scope: ['openid', 'profile', 'email'],
    accessType: 'offline',
    prompt: 'consent'
};
