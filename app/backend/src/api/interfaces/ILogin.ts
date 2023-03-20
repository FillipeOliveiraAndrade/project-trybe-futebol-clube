import { IService } from './IService';

export interface ILoginService {
  userLogin(loginData: {
    email: string,
    password: string
  }): Promise<IService>

  loginRole(token: string): Promise<IService>;
}
