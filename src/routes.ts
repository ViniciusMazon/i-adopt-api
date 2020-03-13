import { Router } from 'express';
import JWT from './auth/JWT';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PetController from './controllers/PetController';
import OrganizationController from './controllers/OrganizationController';
import TutorsController from './controllers/TutorController';

const routes = Router();
const jwt = new JWT();

const user = new UserController()
const session = new SessionController();
const pet = new PetController();
const organization = new OrganizationController();
const tutor = new TutorsController();

routes.post('/login', session.login);

routes.get('/users', user.index); //Admin
routes.post('/users', user.store); //Public
routes.put('/users', user.update); //Admin
routes.delete('/users', user.destroy); //Admin
routes.get('/users/credentials', user.show); //Admin

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



routes.get('/ping', (req, res) => res.send('pong')); //Public (test route)

export default routes;
