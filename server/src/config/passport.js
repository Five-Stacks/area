import express from 'express';
import passport from 'passport';
import session from 'express-session';
import 'dotenv/config';

const router = express.Router();

// Session and passport middlewares mounted on a router so the caller can use
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: true, sameSite: 'none'}
}));

router.use(passport.initialize());
router.use(passport.session());

export default function passportSetup() {
  return router;
}