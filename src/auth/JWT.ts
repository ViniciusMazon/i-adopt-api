require('dotenv').config({ path: '../../.env' });
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class JWT {

  sign(user_id: number, user_name: string, org_id: number) {
    const token = jwt.sign({ user_id, user_name, org_id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    return { authorization: `Bearer ${token}` }
  }

  verify(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
      jwt.verify(token, process.env.TOKEN_SECRET);
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }
  }
}

export = JWT;
