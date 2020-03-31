import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/Multer';
import JWT from './auth/JWT';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PetController from './controllers/PetController';
import PetImageController from './controllers/PetImagesController';
import OrganizationController from './controllers/OrganizationController';
import TutorsController from './controllers/TutorController';
import Application from './controllers/ApplicationController';

const routes = Router();
const jwt = new JWT();

const user = new UserController()
const session = new SessionController();
const pet = new PetController();
const petImage = new PetImageController();
const organization = new OrganizationController();
const tutor = new TutorsController();
const application = new Application();

routes.post('/login', session.login);

routes.get('/users', user.index); //Admin
routes.post('/users', user.store); //Public
routes.put('/users', user.update); //Admin
routes.delete('/users', user.destroy); //Admin
routes.get('/users/credentials', user.show); //Admin

routes.post('/petsimage', multer(multerConfig).single('file'), petImage.store);


routes.post('/pets', jwt.verify, pet.store); //Restricted
routes.get('/pets', jwt.verify, pet.index); //Restricted
routes.get('/pets/details', jwt.verify, pet.show); //Restricted
routes.put('/pets', jwt.verify, pet.update); //Restricted
routes.delete('/pets', jwt.verify, pet.destroy); //Restricted

routes.post('/organization', organization.store); //Public
routes.get('/organization', organization.index); //Public
routes.get('/organization/details', organization.show); //Public
routes.put('/organization', organization.update); //Admin
routes.delete('/organization', organization.destroy); //Admin

routes.post('/tutors', tutor.store);
routes.get('/tutors', tutor.show);

routes.post('/applications', jwt.verify, application.store);
routes.get('/applications', jwt.verify, application.index);
routes.get('/applications/review', jwt.verify, application.show);
routes.put('/applications/status', jwt.verify, application.update);

routes.get('/ping', (req, res) => res.send('pong')); //Public (test route)

export default routes;
