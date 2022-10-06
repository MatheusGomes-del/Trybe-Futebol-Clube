import * as bcrypt from 'bcryptjs';

const bcryptPasswordValidation = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);

export default bcryptPasswordValidation;
