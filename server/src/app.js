/* Import modules */
import express from 'express';
import cookieParser from 'cookie-parser';
import corsSetup from './config/cors.js';
import passportSetup from './config/passport.js';
import authRouter from './routes/authRoute.js';
import serviceRouter from './routes/serviceRoute.js';
import userServiceRouter from './routes/userServiceRoute.js';
import actionRouter from './routes/actionRoute.js';
import reactionRouter from './routes/reactionRoute.js';
import areaRouter from './routes/areaRoute.js';
import areaExecutionRouter from './routes/areaExecutionRoute.js';
import userRouter from './routes/userRoute.js';
import oauthRouter from './routes/oauth.js';
import notFound from './middleware/notFound.js';

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

/* Route handling */
app.use('/api/auth', authRouter);
app.use('/api/service', serviceRouter);
app.use('/api/userService', userServiceRouter);
app.use('/api/action', actionRouter);
app.use('/api/reaction', reactionRouter);
app.use('/api/area', areaRouter);
app.use('/api/areaExecution', areaExecutionRouter);
app.use('/api/users', userRouter);
app.use('/api/oauth', oauthRouter);

/* 404 Middleware */
app.use(notFound);

/* Export application */
export default app;
