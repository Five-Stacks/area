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
import { verifyToken } from '../middleware/auth/verifyToken.js';

oauth();

router.get('/', (req, res) => {
  res.send('Auth endpoints: /auth/google');
});

// Google OAuth routes

router.get('/google', verifyToken, passport.authenticate('google', googleAuthOptions));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Discord OAuth routes

router.get('/discord', verifyToken, passport.authenticate('discord', discordAuthOptions));

router.get('/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  }
);

// Spotify OAuth routes

router.get('/spotify', verifyToken, passport.authenticate('spotify', spotifyAuthOptions));

router.get('/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  }
);

// Microsoft OAuth routes

router.get('/microsoft', verifyToken, passport.authenticate('microsoft', microsoftAuthOptions));

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  }
);


// Github OAuth routes

router.get('/github', verifyToken, passport.authenticate('github', githubAuthOptions));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  }
);

router.get('/twitter', verifyToken, passport.authenticate('twitter', twitterAuthOptions));

router.get('/twitter/callback', (req, res, next) => {
    // Successful authentication
    res.redirect('/');
});

export default router;
