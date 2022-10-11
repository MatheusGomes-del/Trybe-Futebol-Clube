import * as bcrypt from 'bcryptjs';

class bcryptPass {
  static bcryptPasswordValidation(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}

export default bcryptPass;
