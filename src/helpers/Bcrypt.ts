import bcrypt, { hash } from 'bcryptjs';

class Bcrypt {
  async encrypt(password: string) {
    const hash_password = await bcrypt.hash(password, 10);
    return hash_password;
  }

  async auth(handler_password: string, hash_password: string) {
   return await bcrypt.compare(handler_password, hash_password);
  }
}

export = Bcrypt;
