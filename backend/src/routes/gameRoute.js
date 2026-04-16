import { Router } from 'express';
import { getGames, validateLocation } from '../controllers/gameController.js';

const router = Router();

router.get('/', getGames);
router.post('/validate', validateLocation);

export default router;