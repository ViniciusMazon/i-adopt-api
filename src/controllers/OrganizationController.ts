import { Request, Response } from 'express';
import Organization from '../models/Organization';

interface IOrganizationData {
  name: string
}

interface IOrganizationUpdate {
  id: number,
  name: string
}

class OrganizationController {
  async show(req: Request, res: Response) {
    const organization = new Organization()
    const name: string = req.query.name;
    const result = await organization.get(name);
    res.json(result);
  }

  async index(req: Request, res: Response) {
    const organization = new Organization();
    const result = await organization.getAll();
    res.status(result.status).json(result.data);
  }

  async store(req: Request, res: Response) {
    const organization = new Organization();

    const { name } = req.body;

    const organizationData: IOrganizationData = {
      name
    }

    const result = await organization.set(organizationData);
    res.status(result.status).json(result.data);
  }

  async update(req: Request, res: Response) {
    const organization = new Organization();
    const { id, name } = req.body;

    const organizationUpdate: IOrganizationUpdate = {
      id,
      name
    }

    const result = await organization.edit(organizationUpdate);
    res.status(result.status).json(result.data);
  }

  async destroy(req: Request, res: Response) {
    const organization = new Organization();
    const id: number = req.query.id;
    const result = await organization.delete(id);
    res.status(result.status).json(result.data);
  }
}

export = OrganizationController;
