import { Request, Response } from 'express';
import moment from 'moment';
import PetImage from '../models/PetImage';

interface IPetsImage {
  name: string,
  size: number,
  url: string,
  creation_date: Date
}

class PetImageController {
  async store(req: Request, res: Response) {
    const petImage = new PetImage();
    const date = new Date(moment().format('YYYY-MM-DD'));

    const { originalname: name, size, key } = req.file;

    const petImageData: IPetsImage = {
      name,
      size,
      url: `http://localhost:4000/files/${key}`,
      creation_date: date
    }

    const result = await petImage.set(petImageData);
    res.json(result);
  }

  async destroy(req: Request, res: Response) {
    const petImage = new PetImage();
    const id: number = req.query.id;
    try {
      petImage.delete(id);
      return res.json({ message: 'ok' });
    } catch (err) {
      return res.json({ message: err });
    }
  }
}

export = PetImageController;
