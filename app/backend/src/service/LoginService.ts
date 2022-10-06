import token from '../helpers/token';
import IUser from '../interface/User';
import LoginModel from '../database/models/UserModel';

export default class LoginService {
  static async login(email: string, password: string): Promise<string> {
    const _token = token(email, password);

    return _token;
  }

  static async validate(email: string): Promise<string> {
    const model = LoginModel;

    const user = await model.findOne({ where: { email } }) as IUser;
    const { role } = user;

    return role;
  }
}
