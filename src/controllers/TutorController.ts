import { Request, Response } from 'express';
import moment from 'moment';
import Tutors from '../models/Tutors';
import Contacts from '../models/Contacts';
import Address from '../models/Address';
import Historic from '../models/Historics';

enum marital_status {
  single,
  married,
  divorced,
  widower
}

interface ITutorData {
  first_name: string,
  last_name: string,
  profession: string,
  date_of_birth: Date,
  marital_status: marital_status,
  address_id: number,
  contact_id: number,
  historic_id: number
}

interface IContactData {
  area_code: string,
  phone: string,
  email: string
}

enum Type_residence {
  house, apartment, farm
}

interface IAddressData {
  street: string,
  neighborhood: string,
  num: string,
  city: string,
  region: string,
  zip_code: string,
  type_of_residence: Type_residence,
  adult_residents: string,
  children_residents: string,
  has_smokers: boolean
}

interface IHistoricData {
  already_adopted: boolean,
  animals_home: boolean,
  animals_home_description: string,
  sick_animals_home: boolean,
  add_budget_spend: boolean,
  why_want_adopt: string,
  have_questions: string
}


class TutorController {

  async store(req: Request, res: Response) {
    const tutor = new Tutors();
    const contact = new Contacts();
    const address = new Address();
    const historic = new Historic();

    const {
      first_name,
      last_name,
      profession,
      date_of_birth,
      marital_status,
      area_code,
      phone,
      email,
      street,
      neighborhood,
      num,
      city,
      region,
      zip_code,
      type_of_residence,
      adult_residents,
      children_residents,
      has_smokers,
      already_adopted,
      animals_home,
      animals_home_description,
      sick_animals_home,
      add_budget_spend,
      why_want_adopt,
      have_questions
    } = req.body;

    const date = new Date(moment(date_of_birth).format('YYYY-MM-DD'));

    const contactData: IContactData = {
      area_code,
      phone,
      email
    }

    const addressData: IAddressData = {
      street,
      neighborhood,
      num,
      city,
      region,
      zip_code,
      type_of_residence,
      adult_residents,
      children_residents,
      has_smokers
    }

    const historicData = {
      already_adopted,
      animals_home,
      animals_home_description,
      sick_animals_home,
      add_budget_spend,
      why_want_adopt,
      have_questions
    }

    const contact_id = await contact.setContact(contactData);
    const address_id = await address.setAddress(addressData);
    const historic_id = await historic.setHistoric(historicData);

    const tutorData: ITutorData = {
      first_name,
      last_name,
      profession,
      date_of_birth: date,
      marital_status,
      address_id,
      contact_id,
      historic_id
    }

    console.log('TUTOR DATA >>>>>>>>>>', tutorData)

    const result = await tutor.setTutor(tutorData);
    console.log('result DATA >>>>>>>>>>', result.data)
    res.status(result.status).json(result.data);
  }

  async show(req: Request, res: Response) {
    const tutor = new Tutors()
    const id: number = req.query.id;
    const result = await tutor.getTutor(id);
    res.json(result);
  }
}

export = TutorController;
