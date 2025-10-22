/* Import modules */
import express from 'express';
import aboutController from '../controllers/aboutController.js';

/* Initialize router */
const router = express.Router();

/* Define routes */
router.get('/about.json', aboutController.getAboutInfo);

/* Export router */
export default router;
