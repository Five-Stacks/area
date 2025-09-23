import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/spotify/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Handle user authentication and profile retrieval
}));

export default passport;
