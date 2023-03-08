import { Router } from 'express';
import TeamController from '../api/controller/TeamController';
import TeamService from '../api/services/TeamService';

const router = Router();

const service = new TeamService();
const controller = new TeamController(service);

router.get('/teams', controller.getAll);
router.get('/teams:id', controller.getTeamById);

export default router;
