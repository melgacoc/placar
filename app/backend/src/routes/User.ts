import { Router } from 'express';
import UserController from '../api/controller/UserController';
import UserService from '../api/services/UserService';
// import userValidation from '../api/middlewares/userValidation';

const router = Router();

const service = new UserService();
const controller = new UserController(service);

router.post('/', controller.login);

export default router;
