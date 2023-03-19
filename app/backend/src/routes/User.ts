import { Router } from 'express';
import UserController from '../api/controller/UserController';
import UserService from '../api/services/UserService';
import userValidation from '../api/middlewares/userValidation';
import tokenValidation from '../api/middlewares/tokenValidation';

const router = Router();

const service = new UserService();
const controller = new UserController(service);

router.post('/', userValidation.loginValidation, controller.login);
router.post('/role', tokenValidation.tokenValidation, controller.role);

export default router;
