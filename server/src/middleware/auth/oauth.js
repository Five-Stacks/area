import passport from 'passport';
import './oauthGoogle.js';
import './oauthGithub.js';
import './oauthDiscord.js';
import './oauthTwitter.js';
import './oauthSpotify.js';
import './oauthMicrosoft.js';

function initializeOAuth() {
    // TODO: Replace these with DB-backed serialization (store user.id)
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    console.log("OAuth strategies initialized and session serialization configured.");
}

export default initializeOAuth;
