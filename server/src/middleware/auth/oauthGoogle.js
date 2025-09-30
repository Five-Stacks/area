import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';
import { UserService } from '../../models/userServiceModel.js';
import { Service } from '../../models/serviceModel.js';

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
            await UserService.create({
                user_id: currentUser.id,
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
