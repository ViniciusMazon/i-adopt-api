import { Request, Response } from 'express';
import moment from 'moment';
import Application from '../models/Application';

enum status_type {
  'accept', 'new', 'adopted', 'canceled', 'rejected'
}

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

    const result = await application.set(applicationData);
    res.status(result.status).json(result.data);
  }

  async show(req: Request, res: Response) {
    const application = new Application();
    const id: number = req.query.id || 0;
    const pet_name: string = req.query.pet_name || '';
    const page: number = parseInt(req.query.page) || 1;



    try {
      const result = await application.get(id, pet_name);
      const sliceBegin = (page - 1) * 5;
      const sliceEnd = sliceBegin + 5;
      const applications = result.slice(sliceBegin, sliceEnd);
      const totalPages = Math.ceil(result.length / 5);
      const data = {
        applications,
        page,
        total: totalPages,
      }
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  }

  async index(req: Request, res: Response) {
    const application = new Application();
    const organization_id: number = req.query.organization_id;
    const page: number = parseInt(req.query.page);
    const status = req.query.status;

    const filters = {
      status
    }

    const result = await application.getAll(organization_id, filters);

    const sliceBegin = (page - 1) * 5;
    const sliceEnd = sliceBegin + 5;
    const applications = result.slice(sliceBegin, sliceEnd);
    const totalPages = Math.ceil(result.length / 5);

    const data = {
      applications,
      page,
      total: totalPages,
    }

    res.json(data);
  }

  async update(req: Request, res: Response) {
    const application = new Application();
    const id: number = req.query.id;
    const status: status_type = req.body.status;
    try {
      const result = await application.setStatus(id, status);
      res.json(result.rows[0]);
    } catch (error) {
      res.json('Error')
    }

  }

  async destroy(req: Request, res: Response) {

  }
}

export = ApplicationController;
