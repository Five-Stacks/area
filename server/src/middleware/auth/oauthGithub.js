import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Here you would typically find or create a user in your database
  }
));