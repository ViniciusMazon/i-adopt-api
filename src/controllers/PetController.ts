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
  image: string,
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
  image: string,
}

class PetController {
  async store(req: Request, res: Response) {
    const pet = new Pets();
    const date = new Date(moment().format('YYYY-MM-DD'));
    const { name, specie, gender, size, price, image, organization_id } = req.body;

    const petData: IPetsData = {
      name,
      specie,
      gender,
      size,
      price,
      image,
      organization_id,
      creation_date: date
    }

    const result = await pet.set(petData);
    res.status(result.status).json(result.data);
  }

  async index(req: Request, res: Response) {
    const pet = new Pets();
    const result = await pet.getAll();
    res.status(result.status).json(result.data);
  }

  async show(req: Request, res: Response) {
    const pet = new Pets()
    const id: number = req.query.id;
    const result = await pet.get(id);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const pet = new Pets();
    const { id, name, specie, gender, size, price, image } = req.body;

    const petUpdate: IPetsUpdate = {
      id,
      name,
      specie,
      gender,
      size,
      price,
      image
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
