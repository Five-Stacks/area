import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/discord/callback",
    scope: ['identify', 'email'],
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const provider = 'discord';
        const providerUserId = profile.id;

        let oauthAccount = await OAuthAccount.findOne({ where: { provider, provider_user_id: providerUserId } });

        if (oauthAccount) {
            await oauthAccount.update({
                access_token: accessToken || oauthAccount.access_token,
                refresh_token: refreshToken || oauthAccount.refresh_token
            });

            const user = await User.findByPk(oauthAccount.user_id);
            if (user) return done(null, user);
            await oauthAccount.destroy();
        }

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

        const email = Array.isArray(profile.email) ? profile.email : (profile.email || null);
        let user = null;
        if (email) {
            user = await User.findOne({ where: { email } });
        }

        if (!user) {
            const name = profile.username || profile.displayName || 'DiscordUser';
            user = await User.create({
                email: email || null,
                name,
                is_verified: !!email
            });
        }

        await OAuthAccount.create({
            user_id: user.id,
            provider,
            provider_user_id: providerUserId,
            access_token: accessToken,
            refresh_token: refreshToken
        });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

export default passport;

export const discordAuthOptions = {
    scope: ['identify', 'email', 'guilds']
};
