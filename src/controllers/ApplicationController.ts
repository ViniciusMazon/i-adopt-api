import { Request, Response } from 'express';
import moment from 'moment';
import Application from '../models/Application';

interface IApplicationData {
  pet_id: number,
  tutor_id: number,
  date_creation: Date,
}

class ApplicationController {

  async store(req: Request, res: Response) {
    const application = new Application();

    const {
      pet_id,
      tutor_id,
    } = req.body;

    const date = new Date(moment().format('YYYY-MM-DD'));

    const applicationData: IApplicationData = {
      pet_id,
      tutor_id,
      date_creation: date
    }
    console.log('>>>>>>>>>>>>>>>', applicationData)
    const result = await application.set(applicationData);
    console.log('>>>>>>>>>>>>>>>', result)
    res.status(result.status).json(result.data);
  }

  async show(req: Request, res: Response) {
    const application = new Application();
    const id: number = req.query.id;
    const result = await application.get(id);
    res.json(result);
  }

  async index(req: Request, res: Response) {
    const application = new Application();
    const result = await application.getAll();
    res.status(result.status).json(result.data);
  }



  async destroy(req: Request, res: Response) {
    const application = new Application();
    const id: number = req.query.id;
    const result = await application.delete(id);
    res.status(result.status).json(result.data);
  }
}

export = ApplicationController;
