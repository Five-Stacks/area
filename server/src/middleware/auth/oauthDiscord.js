import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';
import { UserService } from '../../models/userServiceModel.js';
import { Service } from '../../models/serviceModel.js';


passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: "https://area.pintardware.dev/api/oauth/discord/callback",
    scope: ['identify', 'email', 'guilds'],
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const provider = 'Discord';
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

export default passport;

export const discordAuthOptions = {
    scope: ['identify', 'email', 'guilds'],
    prompt: 'consent'
};
