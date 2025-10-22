import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';
import { UserService } from '../../models/userServiceModel.js';
import { Service } from '../../models/serviceModel.js';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/oauth/github/callback",
    passReqToCallback: true
  },
  async function(req, accessToken, refreshToken, profile, done) {
    try {
      const provider = 'Github';
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
  }
));

export const githubAuthOptions = {
  scope: ['user:email', 'repo', 'read:org', 'read:user', 'user:follow', 'notifications', 'gist', 'workflow', 'admin:repo_hook', 'write:repo_hook']
};