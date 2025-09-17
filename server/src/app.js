/* Import modules */
import express from 'express';
import dotenv from 'dotenv';

/* Environment setup */
dotenv.config();

/* App initialization */
const app = express();

/* Middleware setup */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Define routes */
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

/* 404 handler */
app.use((req, res) => {
  res.status(404).send('Sorry, we could not find that!');
});

/* Export application */
export default app;
