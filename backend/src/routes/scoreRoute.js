import { Router } from 'express';
import { getLeaderboard, submitScore } from '../controllers/scoreController.js';

const router = Router();

router.post('/submit', submitScore);
router.get('/leaderboard/:gameSlug', getLeaderboard);

export default router;