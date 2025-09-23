import express from 'express';
import passport from 'passport';

const router = express.Router();

// Import OAuth strategies
import oauth from '../middleware/auth/oauth.js';

oauth();

router.get('/', (req, res) => {
  res.send('Auth endpoints: /auth/google');
});

// Google OAuth routes

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Discord OAuth routes

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Spotify OAuth routes

router.get('/spotify', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'] }));

router.get('/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// Microsoft OAuth routes

router.get('/microsoft', passport.authenticate('microsoft', { scope: ['user.read', 'openid', 'profile', 'email'] }));

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);


// Github OAuth routes

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.get('/twitter', passport.authenticate('twitter', { scope: ['tweet.read', 'users.read'] }));

router.get('/twitter/callback', (req, res, next) => {
  passport.authenticate('twitter', (err, user, info) => {
    // Detailed diagnostics
    console.log('passport twitter callback -> err:', err);
    console.log('passport twitter callback -> info:', info);

    if (err) {
      // If oauth lib attached response data, it may be in err.data or err.oauthError
      console.log('passport twitter callback -> err.data:', err?.data);
      return res.status(500).json({ message: 'OAuth error', error: String(err), data: err?.data ?? null });
    }

    if (!user) {
      console.log('passport twitter callback -> no user, info:', info);
      return res.status(401).json({ message: 'Authentication failed', info });
    }

    // If you do not have sessions configured, just return user for debugging
    req.logIn?.(user, (loginErr) => {
      if (loginErr) {
        console.log('login error:', loginErr);
        return res.status(500).json({ message: 'Login error', error: String(loginErr) });
      }
      return res.json({ message: 'Authenticated', user });
    }) ?? res.json({ message: 'Authenticated (no session)', user });
  })(req, res, next);
});

export default router;
