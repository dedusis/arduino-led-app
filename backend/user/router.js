import express from 'express';
import userController from './controller.js';

const router = express.Router();

router.post('/', userController.createUserController);

export default router;