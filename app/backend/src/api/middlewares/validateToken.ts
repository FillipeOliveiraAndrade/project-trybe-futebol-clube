import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/http.exception';
import { validateToken } from '../utils/jwt';

class ValidateToken {
  public static validateToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization: token } = req.headers;

    if (!token) {
      throw new HttpException(401, 'Token not found');
    }

    if (token.length < 16) {
      throw new HttpException(401, 'Token must be a valid token');
    }

    const decodeUser = validateToken(token);
    if (!decodeUser) {
      throw new HttpException(401, 'Token must be a valid token');
    }

    return next();
  };
}

export default ValidateToken;
