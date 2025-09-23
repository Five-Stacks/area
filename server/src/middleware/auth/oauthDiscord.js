import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/discord/callback",
    scope: ['identify', 'email']
}, (accessToken, refreshToken, profile, done) => {
    // Handle user authentication and profile retrieval
}));

export default passport;
