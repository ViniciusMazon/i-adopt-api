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
import ApplicationController from './controllers/ApplicationController';
import OrganizationReportController from './controllers/OrganizationReportController';

const routes = Router();
const jwt = new JWT();

const user = new UserController()
const session = new SessionController();
const pet = new PetController();
const petImage = new PetImageController();
const organization = new OrganizationController();
const tutor = new TutorsController();
const application = new ApplicationController();
const organizationReport = new OrganizationReportController();

routes.post('/login', session.login);

routes.get('/users', jwt.verify, user.index);
routes.post('/users', user.store);
routes.put('/users', jwt.verify, user.update);
routes.delete('/users', jwt.verify, user.destroy);
routes.get('/users/credentials', user.show);

routes.post('/petsimage', jwt.verify, multer(multerConfig).single('file'), petImage.store);
routes.delete('/petsimage', jwt.verify, petImage.destroy);


routes.post('/pets', jwt.verify, pet.store);
routes.get('/pets', jwt.verify, pet.index);
routes.get('/pets/details', jwt.verify, pet.show);
routes.put('/pets', jwt.verify, pet.update);
routes.delete('/pets', jwt.verify, pet.destroy);

routes.post('/organization', organization.store);
routes.get('/organization', organization.index);
routes.get('/organization/details', organization.show);
routes.put('/organization', jwt.verify, organization.update);
routes.delete('/organization', jwt.verify, organization.destroy);

routes.post('/tutors', tutor.store);
routes.get('/tutors', jwt.verify, tutor.show);

routes.post('/applications', jwt.verify, application.store);
routes.get('/applications', jwt.verify, application.index);
routes.get('/applications/review', jwt.verify, application.show);
routes.put('/applications/status', jwt.verify, application.update);

routes.get('/report/organization', jwt.verify, organizationReport.show);

routes.get('/ping', (req, res) => res.send('pong'));

export default routes;
