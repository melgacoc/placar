import { Router } from 'express';
import MatchesController from '../api/controller/MatchesController';
import MatchesService from '../api/services/MatchesService';

const router = Router();

const service = new MatchesService();
const controller = new MatchesController(service);

router.get('/', controller.getAll);

export default router;
