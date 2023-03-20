import { Router } from 'express';
import UserController from '../api/controller/UserController';
import UserService from '../api/services/UserService';
import userValidation from '../api/middlewares/userValidation';
import tokenValidation from '../api/middlewares/tokenValidation';

const router = Router();

const service = new UserService();
const controller = new UserController(service);

router.post('/', userValidation.loginValidation, controller.login);
router.get('/role', tokenValidation.tokenValidation, controller.findRole);

export default router;
