import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/http.exception';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpException;
  return res.status(status || 500).json({ message });
};

export default errorMiddleware;
