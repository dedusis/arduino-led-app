import express from "express";
import { Router } from "express";
import ledRouter from '../led/router.js';
import userRouter from '../user/router.js';

const router = Router();

router.use('/led', ledRouter);
router.use('/user', userRouter);

export default router;
