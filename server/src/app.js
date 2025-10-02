/* Import modules */
import express from 'express';
import './config/dotenv.js';
import cookieParser from 'cookie-parser';
import corsSetup from './config/cors.js';
import passportSetup from './config/passport.js';
import authRouter from './routes/auth.js';
import oauthRouter from './routes/oauth.js';
import notFound from './middleware/notFound.js';
import servicesSetup from './config/services.js';

/* App initialization */
const app = express();

/* CORS configuration */
app.use(corsSetup);

/* Body parsers */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Passport configuration */
app.use(passportSetup());

/* Use auth routes */
app.use('/api/auth', authRouter);
app.use('/api/oauth', oauthRouter);

/* 404 Middleware */
app.use(notFound);

/* Initialize services */
servicesSetup();

/* Export application */
export default app;
