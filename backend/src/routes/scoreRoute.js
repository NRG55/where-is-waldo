import { Router } from 'express';
import { submitScore } from '../controllers/scoreController.js';

const router = Router();

router.post('/submit', submitScore);

export default router;