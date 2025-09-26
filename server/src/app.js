/* Import modules */
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import notFound from './middleware/notFound.js';

/* App initialization */
const app = express();

/* CORS middleware */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

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
