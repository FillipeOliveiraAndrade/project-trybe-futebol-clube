import { Router } from 'express';

import LeaderBoardService from '../services/leaderBoardService';
import LeaderBoardController from '../controllers/leaderBoardController';

const router = Router();

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

router.get('/home', leaderBoardController.homeTeam);
router.get('/away', leaderBoardController.awayTeam);
router.get('/', leaderBoardController.getAllStatistics);

export default router;
