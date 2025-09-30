import passport from 'passport';
import './oauthGoogle.js';
import './oauthGithub.js';
import './oauthDiscord.js';
import './oauthTwitter.js';
import './oauthSpotify.js';
import './oauthMicrosoft.js';
import { User } from '../../models/userModel.js';

function initializeOAuth() {
    passport.serializeUser((user, done) => {
        try {
            if (user && (user.id || user.userId)) {
                return done(null, user.id || user.userId);
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    });

    passport.deserializeUser(async (obj, done) => {
        try {
            if (typeof obj === 'number' || typeof obj === 'string') {
                const user = await User.findByPk(obj);
                if (user) return done(null, user);
                return done(null, null);
            }

            return done(null, obj);
        } catch (err) {
            return done(err);
        }
    });

    console.log("OAuth strategies initialized and session serialization configured.");
}

export default initializeOAuth;
