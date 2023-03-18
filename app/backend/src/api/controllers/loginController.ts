import { Request, Response } from 'express';
import { ILoginService } from '../interfaces/ILogin';

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

    res.status(200).json({ token: message });
  };
}

export default LoginController;
