import { Router } from 'express';

import TeamsController from '../controllers/teamsController';
import TeamsService from '../services/teamsService';

const router = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/', teamsController.getAllTeams);

export default router;
