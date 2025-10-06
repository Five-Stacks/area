/* Import modules */
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import areaController from '../controllers/areaController.js';

/* Initialize router */
const router = express.Router();

/* Define routes */
router.post('/', verifyToken, areaController.add);
router.get('/', verifyToken, areaController.getAllCurrentUser);
router.get('/:id', verifyToken, areaController.getById);
router.put('/:id', verifyToken, areaController.updateById);
router.delete('/:id', verifyToken, areaController.deleteById);

/* Export router */
export default router;
