import express from 'express';
import passport from 'passport';

const router = express.Router();

// Import OAuth strategies
import oauth from '../middleware/auth/oauth.js';
import { googleAuthOptions } from '../middleware/auth/oauthGoogle.js';
import { githubAuthOptions } from '../middleware/auth/oauthGithub.js';
import { discordAuthOptions } from '../middleware/auth/oauthDiscord.js';
import { spotifyAuthOptions } from '../middleware/auth/oauthSpotify.js';
import { microsoftAuthOptions } from '../middleware/auth/oauthMicrosoft.js';
import { twitterAuthOptions } from '../middleware/auth/oauthTwitter.js';

oauth();

router.get('/', (req, res) => {
  res.send('Auth endpoints: /auth/google');
});

// Google OAuth routes

router.get('/google', passport.authenticate('google', googleAuthOptions));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Discord OAuth routes

router.get('/discord', passport.authenticate('discord', discordAuthOptions));

router.get('/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
  }
);

// Spotify OAuth routes

router.get('/spotify', passport.authenticate('spotify', spotifyAuthOptions));

router.get('/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
  }
);

// Microsoft OAuth routes

router.get('/microsoft', passport.authenticate('microsoft', microsoftAuthOptions));

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
  }
);


// Github OAuth routes

router.get('/github', passport.authenticate('github', githubAuthOptions));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
  }
);

router.get('/twitter', passport.authenticate('twitter', twitterAuthOptions));

router.get('/twitter/callback', (req, res, next) => {
    // Successful authentication
});

export default router;
