import { Router } from 'express';

import MatchesController from '../controllers/matchesController';
import MatchesService from '../services/matchesService';

const router = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.findAllMatches);

export default router;
