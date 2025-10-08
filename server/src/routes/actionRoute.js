/* Import modules */
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import actionController from '../controllers/actionController.js';

/* Initialize router */
const router = express.Router();

/* Define routes */
router.get('/', verifyToken, actionController.getAll);
router.get('/:id', verifyToken, actionController.getById);
router.get('/service/:id', verifyToken, actionController.getByServiceId);

/* Export router */
export default router;
