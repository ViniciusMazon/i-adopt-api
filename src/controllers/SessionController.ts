import { Request, Response } from 'express';
import User from '../models/Users';
import Bcrypt from '../helpers/Bcrypt';
import JWT from '../auth/JWT';

class SessionController {

  async login(req: Request, res: Response) {
    const user = new User();

    const userHanddler = req.body
    const userDb = await user.get(userHanddler.email);

    if (userDb !== undefined) {
      const bcrypt = new Bcrypt();
      const match = await bcrypt.auth(userHanddler.password, userDb.hash_password);
      if (match) {
        const jwt = new JWT();
        const token = jwt.sign(userDb.id, userDb.first_name, userDb.organization_id);
        return res.status(200).json(token);
      }
    }
    return res.status(401).send('Email or password invalid');
  }
}

export = SessionController;
