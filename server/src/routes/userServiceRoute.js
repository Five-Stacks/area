/* Import modules */
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import userServiceController from '../controllers/userServiceController.js';

/* Initialize router */
const router = express.Router();

/* Define routes */
router.get('/', verifyToken, userServiceController.getAll);
router.get('/:id', verifyToken, userServiceController.getById);

/* Export router */
export default router;
