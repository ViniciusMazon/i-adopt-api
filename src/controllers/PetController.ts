import { Request, Response } from 'express';
import moment from 'moment';
import Pets from '../models/Pets';

enum specie {
  dog = 'dog', cat = 'cat'
}

enum gender {
  male = 'male', female = 'female'
}

enum size {
  small = 'small', medium = 'medium', big = 'big'
}

interface IPetsData {
  name: string,
  specie: specie,
  gender: gender,
  size: size,
  price: number,
  id_image: number,
  organization_id: number,
  creation_date: Date
}

interface IPetsUpdate {
  id: number,
  name: string,
  specie: specie,
  gender: gender,
  size: size,
  price: number,
  id_image: number,
}

class PetController {

  async store(req: Request, res: Response) {
    const pet = new Pets();
    const date = new Date(moment().format('YYYY-MM-DD'));
    const { name, specie, gender, size, price, id_image, organization_id } = req.body;

    const petData: IPetsData = {
      name,
      specie,
      gender,
      size,
      price,
      id_image,
      organization_id,
      creation_date: date
    }

    const result = await pet.set(petData);
    res.status(result.status).json(result.data);
  }

  async index(req: Request, res: Response) {
    const pet = new Pets();
    const organization_id = req.query.organization_id;
    const page: number = parseInt(req.query.page);
    const result = await pet.getAll(organization_id);
    const pets = result.data.slice(page - 1, page + 4);
    const totalPages = Math.ceil(result.data.length / 5);
    const data = {
      pets,
      page,
      total: totalPages
    }
    res.json(data);
  }

  async show(req: Request, res: Response) {
    const pet = new Pets()
    const id: number = req.query.id;
    try {
      const result = await pet.get(id);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }

  async update(req: Request, res: Response) {
    const pet = new Pets();
    const { id, name, specie, gender, size, price, id_image } = req.body;

    const petUpdate: IPetsUpdate = {
      id,
      name,
      specie,
      gender,
      size,
      price,
      id_image
    }

    const result = await pet.edit(petUpdate);
    res.status(result.status).json(result.data);
  }

  async destroy(req: Request, res: Response) {
    const pet = new Pets();
    const id: number = req.query.id;
    const result = await pet.delete(id);
    res.status(result.status).json(result.data);
  }

}

export = PetController;
