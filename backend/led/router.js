import express from 'express';
import ledController from './controller.js'

const router = express.Router();

router.get('/on', ledController.turnOnLED);
router.get('/off', ledController.turnOffLED);

export default router;