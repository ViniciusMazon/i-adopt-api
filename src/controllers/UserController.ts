import { Request, Response } from 'express';
import moment from 'moment';
import Users from '../models/Users';
import Bcrypt from '../helpers/Bcrypt';

interface IUserData {
  first_name: string,
  last_name: string,
  organization: number,
  email: string,
  hash_password: string,
  creation_date: Date
}

interface IUserUpdate {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  // hash_password: string
}

class UsersController {

  async show(req: Request, res: Response) {
    const user = new Users()
    const email: string = req.query.email;
    const result = await user.get(email);
    res.json(result);
  }

  async index(req: Request, res: Response) {
    const user = new Users();
    const result = await user.getAll();
    res.status(result.status).json(result.data);
  }

  async store(req: Request, res: Response) {
    const user = new Users();
    const bcrypt = new Bcrypt();

    const { first_name, last_name, organization, email, password } = req.body;
    const hash_password = await bcrypt.encrypt(password);
    const date = new Date(moment().format('YYYY-MM-DD'));

    const userData: IUserData = {
      first_name,
      last_name,
      organization,
      email,
      hash_password,
      creation_date: date
    }
    const result = await user.set(userData);
    res.status(result.status).json(result.data);
  }

  async update(req: Request, res: Response) {
    const user = new Users();
    // const bcrypt = new Bcrypt();
    const { id, first_name, last_name, email, password } = req.body;
    // const hash_password = await bcrypt.encrypt(password);

    const userUpdate: IUserUpdate = {
      id,
      first_name,
      last_name,
      email,
      // hash_password
    }

    const result = await user.edit(userUpdate);
    res.status(result.status).json(result.data);
  }

  async destroy(req: Request, res: Response) {
    const user = new Users();
    const id: number = req.query.id;
    const result = await user.delete(id);
    res.status(result.status).json(result.data);
  }
}

export = UsersController;
