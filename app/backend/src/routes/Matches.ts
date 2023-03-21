import { Router } from 'express';
import MatchesController from '../api/controller/MatchesController';
import MatchesService from '../api/services/MatchesService';
import tokenValidation from '../api/middlewares/tokenValidation';

const router = Router();

const service = new MatchesService();
const controller = new MatchesController(service);

router.get('/', controller.getAll);
router.post('/', tokenValidation.tokenValidation, controller.newMatch);
router.patch('/:id/finish', tokenValidation.tokenValidation, controller.finishById);
router.patch('/:id', controller.updateById);

export default router;
