import passport from 'passport';
import { Strategy as TwitterStrategy } from '@superfaceai/passport-twitter-oauth2';
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';

passport.use(new TwitterStrategy({
  clientID: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/twitter/callback",
  passReqToCallback: true
}, async function(req, token, tokenSecret, profile, done) {
  try {
    const provider = 'twitter';
    const providerUserId = profile.id;

    let oauthAccount = await OAuthAccount.findOne({ where: { provider, provider_user_id: providerUserId } });

    if (oauthAccount) {
      await oauthAccount.update({
        access_token: token || oauthAccount.access_token,
        refresh_token: tokenSecret || oauthAccount.refresh_token
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
        access_token: token,
        refresh_token: tokenSecret
      });
      return done(null, currentUser);
    }

    const email = Array.isArray(profile.emails) && profile.emails.length ? profile.emails[0].value : (profile.email || null);
    let user = null;
    if (email) {
      user = await User.findOne({ where: { email } });
    }

    if (!user) {
      const name = profile.displayName || (profile.username || 'TwitterUser');
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
      access_token: token,
      refresh_token: tokenSecret
    });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

export const twitterAuthOptions = {
  scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access']
};
