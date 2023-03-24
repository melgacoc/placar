import { Router } from 'express';
import AwayLeaderboardController from '../api/controller/AwayLeaderboardController';
import AwayLeaderboardService from '../api/services/AwayLeaderboardService';

const router = Router();

const service = new AwayLeaderboardService();
const controller = new AwayLeaderboardController(service);

router.get('/away', (req, res) => controller.leaderboardHome1(req, res));

export default router;
