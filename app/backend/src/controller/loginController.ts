import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IUser from '../interface/User';
import { JWT_SECRET } from '../helpers/token';
// import { JwtUser } from '../interface/IToken';
import { IAuthorization } from '../interface/IAuthorization';
import LoginService from '../service/LoginService';

export default class LoginController {
  public loginService: LoginService;
  constructor() {
    this.loginService = new LoginService();
  }

  static async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);

    return res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers as IAuthorization;

    const userData = jwt.verify(authorization as string, JWT_SECRET);
    const { email } = userData as IUser;
    const role = await LoginService.validate(email);

    return res.status(200).json({ role });
  }
}
