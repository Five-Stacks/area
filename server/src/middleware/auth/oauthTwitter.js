import passport from 'passport';
import { Strategy as TwitterStrategy } from '@superfaceai/passport-twitter-oauth2';
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';
import { UserService } from '../../models/userServiceModel.js';
import { Service } from '../../models/serviceModel.js';

passport.use(new TwitterStrategy({
  clientID: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: "https://area.pintardware.dev/api/oauth/twitter/callback",
  passReqToCallback: true
}, async function(req, token, tokenSecret, profile, done) {
  try {
    const provider = 'Twitter';
    const providerUserId = profile.id;

    if (req.query?.state) {
        const passedState = JSON.parse(decodeURIComponent(req.query.state));
        token = passedState.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    }

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
        user_id: currentUser.userId,
        provider,
        provider_user_id: providerUserId,
        access_token: token,
        refresh_token: tokenSecret
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

export const twitterAuthOptions = {
  scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access']
};
