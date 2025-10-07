/* Import modules */
import express from 'express';
import authController from '../controllers/authController.js';

/* Initialize router */
const router = express.Router();

/* Define routes */
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/isConnected', authController.isConnected);
router.get('/isAdmin', authController.isAdmin);

/* Export router */
export default router;
