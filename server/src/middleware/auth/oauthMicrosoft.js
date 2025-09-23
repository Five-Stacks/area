import passport from 'passport';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';

// Microsoft OAuth2 strategy
passport.use(new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: process.env.MICROSOFT_CALLBACK_URL || 'http://localhost:8080/auth/microsoft/callback',
  scope: ['user.read', 'openid', 'profile', 'email']
}, (accessToken, refreshToken, profile, done) => {
  // Normalize or persist user profile here
  // For now, just pass the profile through like other strategies
  return done(null, profile);
}));

export default passport;
