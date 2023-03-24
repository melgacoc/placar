import { Router } from 'express';
import LeaderboardController from '../api/controller/LeaderboardController';
import LeaderboardService from '../api/services/LeaderboardService';

const router = Router();

const service = new LeaderboardService();
const controller = new LeaderboardController(service);

router.get('/home', (req, res) => controller.leaderboardHome1(req, res));

export default router;
