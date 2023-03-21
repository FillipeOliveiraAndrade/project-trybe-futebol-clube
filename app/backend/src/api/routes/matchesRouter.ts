import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';

import MatchesController from '../controllers/matchesController';
import ValidateMatches from '../middlewares/validateMatches';
import ValidateToken from '../middlewares/validateToken';
import MatchesService from '../services/matchesService';

require('express-async-errors');

const router = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.findAllMatches);

router.patch(
  '/:id/finish',
  ValidateToken.validateToken,
  matchesController.finishingMatchInProgress,
);
router.patch(
  '/:id',
  ValidateToken.validateToken,
  matchesController.updateMatchesInProgress,
);

router.post(
  '/',
  ValidateToken.validateToken,
  ValidateMatches.checkHomeTeamAndAwayTeam,
  asyncHandler(ValidateMatches.checkTeamExists),
  matchesController.addNewMatch,
);

export default router;
