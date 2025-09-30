import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/api/oauth/spotify/callback",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const provider = 'spotify';
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

        const email = Array.isArray(profile.emails) && profile.emails.length ? profile.emails[0].value : null;
        let user = null;
        if (email) {
            user = await User.findOne({ where: { email } });
        }

        if (!user) {
            const name = profile.displayName || (profile.username || 'SpotifyUser');
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

export const spotifyAuthOptions = {
    scope: [
        'user-read-email',
        'user-read-private',
        'playlist-read-private',
        'playlist-modify-private',
        'user-read-playback-state',
        'user-modify-playback-state'
    ]
};
