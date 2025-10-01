import express from 'express';
import userController from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';

/* Initialize router */
const router = express.Router();

/* Define CRUD routes for users */
router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

/* Export router */
export default router;