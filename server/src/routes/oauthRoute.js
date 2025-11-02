import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Import OAuth strategies
import oauth from '../middleware/auth/oauth.js';
import { googleAuthOptions } from '../middleware/auth/oauthGoogle.js';
import { githubAuthOptions } from '../middleware/auth/oauthGithub.js';
import { discordAuthOptions } from '../middleware/auth/oauthDiscord.js';
import { spotifyAuthOptions } from '../middleware/auth/oauthSpotify.js';
import { microsoftAuthOptions } from '../middleware/auth/oauthMicrosoft.js';
import { twitterAuthOptions } from '../middleware/auth/oauthTwitter.js';
import verifyToken from '../middleware/verifyToken.js';

oauth();

function buildState(payload) {
  try {
    let obj;
    if (typeof payload === 'string') obj = { redirect_to: payload };
    else if (payload && typeof payload === 'object') obj = payload;
    else return undefined;
    return encodeURIComponent(JSON.stringify(obj));
  } catch (e) {
    return undefined;
  }
}

function extractRedirectFromState(req) {
  const state = req && req.query && req.query.state;
  if (!state) return '/';
  try {
    const parsed = JSON.parse(decodeURIComponent(state));
    if (parsed && typeof parsed.redirect_to === 'string') {
      const r = parsed.redirect_to;
      if (r.startsWith('/') || r.includes('://')) {
        return r;
      }
    }
  } catch (e) {
    console.error('Error extracting redirect from state:', e);
  }
  return '/';
}

function restoreUserFromState(req, res, next) {
  const state = req && req.query && req.query.state;
  if (!state) return next();
  try {
    const parsed = JSON.parse(decodeURIComponent(state));
    const token = parsed && parsed.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (e) {
        return res.redirect('/login');
      }
    }
  } catch (e) {
  }
  return next();
}

router.get('/', (req, res) => {
  res.send('Auth endpoints: /auth/google');
});

// Google OAuth routes

router.get('/google', (req, res, next) => {
  console.log('Initiating Google OAuth flow');
  const redirectTo = req.body?.redirect_to || req.query?.redirect_to;
  const options = { ...googleAuthOptions };
  const state = buildState({
    redirect_to: redirectTo || '/',
    token: req.query?.token
  });
  if (state) options.state = state;
  passport.authenticate('google', options)(req, res, next);
});

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectTo = extractRedirectFromState(req);
    res.redirect(redirectTo);
  }
);

router.get('/google/login', (req, res, next) => {
  const redirectTo = req.body?.redirect_to || req.query?.redirect_to;
  const options = { ...googleAuthOptions };
  const state = redirectTo ? buildState(redirectTo) : undefined;
  if (state) options.state = state;
  passport.authenticate('google', options)(req, res, next);
});

// Discord OAuth routes

router.get('/discord', verifyToken, (req, res, next) => {
  const redirectTo = req.body?.redirect_to || req.query?.redirect_to;
  const options = { ...discordAuthOptions };
  const state = redirectTo ? buildState(redirectTo) : undefined;
  if (state) options.state = state;
  passport.authenticate('discord', options)(req, res, next);
});

router.get('/discord/callback',
  verifyToken,
  passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectTo = extractRedirectFromState(req);
    res.redirect(redirectTo);
  }
);

// Spotify OAuth routes

router.get('/spotify', verifyToken, (req, res, next) => {
  const redirectTo = req.body?.redirect_to || req.query?.redirect_to;
  const options = { ...spotifyAuthOptions };
  const token = req.cookies?.token;
  const statePayload = token ? { redirect_to: redirectTo || '/', token } : (redirectTo ? redirectTo : undefined);
  const state = statePayload ? buildState(statePayload) : undefined;
  if (state) options.state = state;
  passport.authenticate('spotify', options)(req, res, next);
});

router.get('/spotify/callback',
  restoreUserFromState,
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectTo = extractRedirectFromState(req);
    res.redirect(redirectTo);
  }
);

// Microsoft OAuth routes

router.get('/microsoft', verifyToken, (req, res, next) => {
  const redirectTo = req.body?.redirect_to || req.query?.redirect_to;
  const options = { ...microsoftAuthOptions };
  const state = redirectTo ? buildState(redirectTo) : undefined;
  if (state) options.state = state;
  passport.authenticate('microsoft', options)(req, res, next);
});

router.get('/microsoft/callback',
  verifyToken,
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectTo = extractRedirectFromState(req);
    res.redirect(redirectTo);
  }
);


// Github OAuth routes

router.get('/github', verifyToken, (req, res, next) => {
  const redirectTo = req.body?.redirect_to || req.query?.redirect_to;
  const options = { ...githubAuthOptions };
  const state = redirectTo ? buildState(redirectTo) : undefined;
  if (state) options.state = state;
  passport.authenticate('github', options)(req, res, next);
});

router.get('/github/callback',
  verifyToken,
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    const redirectTo = extractRedirectFromState(req);
    res.redirect(redirectTo);
  }
);

router.get('/twitter', verifyToken, (req, res, next) => {
  const redirectTo = req.body?.redirect_to || req.query?.redirect_to;
  const options = { ...twitterAuthOptions };
  const state = redirectTo ? buildState(redirectTo) : undefined;
  if (state) options.state = state;
  passport.authenticate('twitter', options)(req, res, next);
});

router.get('/twitter/callback', (req, res, next) => {
    const redirectTo = extractRedirectFromState(req);
    res.redirect(redirectTo);
});

export default router;
