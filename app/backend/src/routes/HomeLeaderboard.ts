import { Router } from 'express';
import LeaderboardController from '../api/controller/HomeLeaderboardController';
import HomeLeaderboardService from '../api/services/HomeLeaderboardService';

const router = Router();

const service = new HomeLeaderboardService();
const controller = new LeaderboardController(service);

router.get('/home', (req, res) => controller.leaderboardHome1(req, res));

export default router;
