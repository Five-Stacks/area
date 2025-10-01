/* Import modules */
import express from 'express';
import cookieParser from 'cookie-parser';
import corsSetup from './config/cors.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import notFound from './middleware/notFound.js';

/* App initialization */
const app = express();

/* CORS configuration */
app.use(corsSetup);

/* Body parsers */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Define routes */
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

/* 404 Middleware */
app.use(notFound);

/* Export application */
export default app;
