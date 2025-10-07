/* Import modules */
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import reactionController from '../controllers/reactionController.js';

/* Initialize router */
const router = express.Router();

/* Define routes */
router.get('/', verifyToken, reactionController.getAll);
router.get('/:id', verifyToken, reactionController.getById);

/* Export router */
export default router;
