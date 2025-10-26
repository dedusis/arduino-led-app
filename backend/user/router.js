import expess from 'express';
import userController from './controller.js';

const router = expess.Router();

router.post('/', userController.createUserController);

export default router;