/* Import modules */
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import serviceController from '../controllers/serviceController.js';

/* Initialize router */
const router = express.Router();

/* Define routes */
router.get('/', verifyToken, serviceController.getAll);
router.get('/:id', verifyToken, serviceController.getById);

/* Export router */
export default router;
