import express from "express";
import { Router } from "express";
import ledRouter from '../led/router.js';
import userRouter from '../user/router.js';
import authRouter from '../auth/router.js';

const router = Router();

router.use('/led', ledRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
