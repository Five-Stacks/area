import passport from 'passport';
import { Strategy as TwitterStrategy } from '@superfaceai/passport-twitter-oauth2';

passport.use(new TwitterStrategy({
  clientID: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/twitter/callback"
}, function(token, tokenSecret, profile, done) {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile object
  // Return the profile so that Passport can serialize the user into the session.
  return done(null, profile);
}));

export const twitterAuthOptions = {
  scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access']
};
