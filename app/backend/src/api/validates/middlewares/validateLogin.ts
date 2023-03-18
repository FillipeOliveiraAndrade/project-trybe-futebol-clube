import { NextFunction, Request, Response } from 'express';
import HttpException from '../../utils/http.exception';

class ValidateLogin {
  public static checkLogin = (req: Request, _res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new HttpException(400, 'All fields must be filled');
    }

    const regexEmail = /^\w+@[a-zA-Z_]+?/;
    if (!regexEmail.test(email)) {
      throw new HttpException(401, 'Invalid email or password');
    }

    if (password.length < 6) {
      throw new HttpException(401, 'Invalid email or password');
    }

    return next();
  };
}

export default ValidateLogin;
