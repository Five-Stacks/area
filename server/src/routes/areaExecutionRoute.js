/* Import modules */
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import areaExecutionController from '../controllers/areaExecutionController.js';

/* Initialize router */
const router = express.Router();

/* Define routes */
router.get('/', verifyToken, areaExecutionController.getAllCurrentUser);
router.get('/:id', verifyToken, areaExecutionController.getById);

/* Export router */
export default router;
