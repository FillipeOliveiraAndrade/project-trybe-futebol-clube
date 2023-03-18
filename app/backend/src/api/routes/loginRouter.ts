import { Router } from 'express';
import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';

import ValidateLogin from '../validates/middlewares/validateLogin';

const router = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/', ValidateLogin.checkLogin, loginController.loginUser);

export default router;
