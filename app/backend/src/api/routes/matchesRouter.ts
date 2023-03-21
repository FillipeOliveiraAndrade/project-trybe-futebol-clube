import { Router } from 'express';

import MatchesController from '../controllers/matchesController';
import ValidateToken from '../middlewares/validateToken';
import MatchesService from '../services/matchesService';

const router = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.findAllMatches);
router.patch(
  '/:id/finish',
  ValidateToken.validateToken,
  matchesController.finishingMatchInProgress,
);

export default router;
