import { Router } from 'express';
import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';

import ValidateLogin from '../middlewares/validateLogin';
import ValidateToken from '../middlewares/validateToken';

const router = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/', ValidateLogin.checkLogin, loginController.loginUser);
router.get('/role', ValidateToken.validateToken, loginController.loginRole);

export default router;
