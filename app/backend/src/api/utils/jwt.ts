import * as jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'secret';

export const generateToken = (email: string, role: string) => jwt.sign({ email, role }, secret, {
  algorithm: 'HS256',
  expiresIn: '3h',
});

export const validateToken = (token: string) => {
  const decode = jwt.verify(token, secret);
  return decode;
};
