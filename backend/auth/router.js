import express from 'express';
import authController from './controller.js'
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', authController.loginController);
router.get('/profile', verifyToken, authController.profileController);

export default router;