/* Import modules */
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import notFound from './middleware/notFound.js';

/* App initialization */
const app = express();

/* Middleware setup */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Define routes */
app.use('/api/auth', authRouter);

/* 404 Middleware */
app.use(notFound);

/* Export application */
export default app;
