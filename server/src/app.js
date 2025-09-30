/* Import modules */
import express from 'express';
import cookieParser from 'cookie-parser';
import corsSetup from './config/cors.js';
import authRouter from './routes/auth.js';
import notFound from './middleware/notFound.js';
import { fileURLToPath } from 'url';

/* Environment variables */
import dotenv from 'dotenv';
import path from 'path';

/* Oauth2 setup */
import oauth from './routes/oauth.js';
import passport from 'passport';
import session from 'express-session';

/* App initialization */
const app = express();

/* CORS configuration */
app.use(corsSetup);

/* Body parsers */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Define routes */
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

/* Use auth routes */

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/oauth', oauth);

/* 404 Middleware */
app.use(notFound);

/* Export application */
export default app;
