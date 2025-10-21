import express from "express";
import { Router } from "express";
import ledRouter from '../led/router.js';

const router = Router();

router.use('/led', ledRouter);

export default router;
