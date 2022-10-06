import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

const jwtConfig: SignOptions = { expiresIn: '6d', algorithm: 'HS256' };
export const JWT_SECRET = 'jwt_secret';

const token = (email: string, password: string): string => {
  const _token = jwt.sign({ email, password }, JWT_SECRET, jwtConfig);

  return _token;
};

export default token;
