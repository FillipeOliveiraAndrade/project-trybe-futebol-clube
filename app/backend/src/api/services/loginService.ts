import { ModelStatic } from 'sequelize';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import UserModel from '../../database/models/UserModel';
import { ILoginService } from '../interfaces/ILogin';
import { generateToken, validateToken } from '../utils/jwt';
import { IService } from '../interfaces/IService';

class LoginService implements ILoginService {
  protected model: ModelStatic<UserModel> = UserModel;
  private messageError = 'Invalid email or password';

  public async userLogin(loginData: { email: string, password: string }): Promise<IService> {
    const { email, password } = loginData;

    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return { type: 401, message: this.messageError };
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return { type: 401, message: this.messageError };
    }

    const token = generateToken(user.email, user.role);

    return { type: null, message: token };
  }

  public async loginRole(token: string): Promise<IService> {
    const { email } = validateToken(token) as jwt.JwtPayload;

    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return { type: 401, message: this.messageError };
    }

    return { type: null, message: user.role };
  }
}

export default LoginService;
