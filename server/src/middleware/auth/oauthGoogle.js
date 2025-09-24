import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Handle user authentication and profile retrieval
    return done(null, profile);
}));

export const googleAuthOptions = {
    scope: ['openid', 'profile', 'email'],
    accessType: 'offline',
    prompt: 'consent'
};
