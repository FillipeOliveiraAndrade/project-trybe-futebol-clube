import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import UserModel from '../../database/models/UserModel';
import { ILogin, ILoginService } from '../interfaces/ILogin';
import { generateToken } from '../utils/jwt';

class LoginService implements ILoginService {
  protected model: ModelStatic<UserModel> = UserModel;

  public async userLogin(loginData: { email: string, password: string }): Promise<ILogin> {
    const { email, password } = loginData;

    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return { type: 401, message: 'Invalid email or password' };
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return { type: 401, message: 'Invalid email or password' };
    }

    const token = generateToken(user.email, user.role);

    return { type: null, message: token };
  }
}

export default LoginService;
