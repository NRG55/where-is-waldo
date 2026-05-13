import { Router } from 'express';
import { startSession, finishSession } from '../controllers/sessionController.js';

const router = Router();

router.post('/start', startSession);
router.post('/finish', finishSession);

export default router;