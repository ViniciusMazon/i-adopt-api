import Types from '../models/Types';
import Pets from '../models/Pets';
import PetImage from '../models/PetImage';
import Tutors from '../models/Tutors';
import Address from '../models/Address';
import Contacts from '../models/Contacts';
import Historics from '../models/Historics';
import Users from '../models/Users';
import Organization from '../models/Organization';
import Application from '../models/Application';

const types = new Types();
const pet = new Pets();
const petImage = new PetImage();
const tutors = new Tutors();
const address = new Address();
const contact = new Contacts();
const historic = new Historics();
const user = new Users();
const organization = new Organization();
const application = new Application();

async function databaseInit() {

  console.log("[START] creating tables if they don't exist");

  console.log('creating types...');
  await types.createTypes();

  console.log('creating organization table...');
  await organization.create_table();

  console.log('creating user table...');
  await user.create_table();

  console.log('creating petImage table...');
  await petImage.create_table();

  console.log('creating pet table...');
  await pet.create_table();

  console.log('creating address table...');
  await address.create_table();

  console.log('creating contact table...');
  await contact.create_table();

  console.log('creating historic table...');
  await historic.create_table();

  console.log('creating tutors table...');
  await tutors.create_table();

  console.log('creating application table...');
  await application.create_table();

  console.log("[DONE] creating tables if they don't exist");
}

export = databaseInit;
