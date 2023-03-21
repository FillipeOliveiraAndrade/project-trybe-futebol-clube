import { Request, Response } from 'express';
import { ILoginService } from '../interfaces/ILogin';
import HttpException from '../utils/http.exception';

class LoginController {
  protected service: ILoginService;

  constructor(service: ILoginService) {
    this.service = service;
  }

  public loginUser = async (req: Request, res: Response) => {
    const loginData = req.body;

    const { type, message } = await this.service.userLogin(loginData);

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(200).json({ token: message });
  };

  public loginRole = async (req: Request, res: Response) => {
    const { authorization: token } = req.headers;

    if (!token) {
      throw new HttpException(400, 'Token not found');
    }

    const { type, message } = await this.service.loginRole(token);

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(200).json({ role: message });
  };
}

export default LoginController;
