import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from '../../models/userModel.js';
import { OAuthAccount } from '../../models/oauthAccountsModel.js';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback",
    passReqToCallback: true
  },
  async function(req, accessToken, refreshToken, profile, done) {
    try {
      const provider = 'github';
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
        const name = profile.displayName || (profile.username || 'GithubUser');
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
  }
));

export const githubAuthOptions = {
  scope: ['user:email', 'repo', 'read:org', 'read:user', 'user:follow', 'notifications', 'gist', 'workflow', 'admin:repo_hook', 'write:repo_hook']
};