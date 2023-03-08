import { Router, Request, Response } from 'express';
import TeamController from '../api/controller/TeamController';
import TeamService from '../api/services/TeamService';

const router = Router();

const service = new TeamService();
const controller = new TeamController(service);

router.get('/teams', (req:Request, res: Response) => controller.getAll(req, res));
router.get('/teams:id',(req:Request, res: Response) => controller.getTeamById(req, res));

export default router;
