/* Import modules */
import express from 'express';
import cookieParser from 'cookie-parser';
import corsSetup from './config/cors.js';
import authRouter from './routes/authRoute.js';
import actionRouter from './routes/actionRoute.js';
import reactionRouter from './routes/reactionRoute.js';
import areaRouter from './routes/areaRoute.js';
import areaExecutionRouter from './routes/areaExecutionRoute.js';
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
app.use('/api/action', actionRouter);
app.use('/api/reaction', reactionRouter);
app.use('/api/area', areaRouter);
app.use('/api/areaExecution', areaExecutionRouter);

/* 404 Middleware */
app.use(notFound);

/* Export application */
export default app;
