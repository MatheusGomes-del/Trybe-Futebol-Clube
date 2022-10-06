import { Request, Response, NextFunction } from 'express';
import bcryptPasswordValidation from '../helpers/bcrypt';
import UserModel from '../database/models/UserModel';
import IUser from '../interface/User';

const ERROR_INCORRECT_INFOS = 'Incorrect email or password';

const verifyLogin = async (req: Request, res: Response, next: NextFunction):
Promise<Response | undefined> => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  next();
};

const verifyUser = async (req: Request, res: Response, next: NextFunction):
Promise<Response | undefined> => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ where: { email } }) as IUser;

  if (user === null) {
    return res.status(401).json({ message: ERROR_INCORRECT_INFOS });
  }

  const crypt = bcryptPasswordValidation(password, user.password);

  if (!crypt) {
    return res.status(401).json({ message: ERROR_INCORRECT_INFOS });
  }

  if (!user) {
    res.status(401).json({ message: ERROR_INCORRECT_INFOS });
  }

  next();
};

const validateAuth = async (req: Request, res: Response, next: NextFunction):
Promise<Response | undefined> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'notFoundToken' });
  }

  next();
};

export default { verifyLogin, validateAuth, verifyUser };
