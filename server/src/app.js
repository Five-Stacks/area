/* Import modules */
import express from 'express';
import { fileURLToPath } from 'url';

/* Environment variables */
import dotenv from 'dotenv';
import path from 'path';

/* Oauth2 setup */
import passport from 'passport';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { default: router } = await import('./routes/authRoutes.js');

/* App initialization */
const app = express();

/* Middleware setup */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/auth', router);

/* 404 handler */
app.use((req, res) => {
  res.status(404).send('Sorry, we could not find that!');
});

/* Export application */
export default app;
