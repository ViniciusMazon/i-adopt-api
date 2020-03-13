import { Router } from 'express';
import JWT from './auth/JWT';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PetController from './controllers/PetController';
import OrganizationController from './controllers/OrganizationController';

const routes = Router();
const jwt = new JWT();

const user = new UserController()
const session = new SessionController();
const pet = new PetController();
const organization = new OrganizationController();

routes.post('/login', session.login);

routes.get('/ping', (req, res) => res.send('pong'));
routes.get('/users', user.index);
routes.post('/users', user.store);
routes.put('/users', user.update);
routes.delete('/users', user.destroy);
routes.get('/users/credentials', user.show);

routes.post('/pets', pet.store);
routes.get('/pets', pet.index);
routes.get('/pets/details', pet.show);
routes.put('/pets', pet.update);
routes.delete('/pets', pet.destroy);

routes.post('/organization', organization.store);
routes.get('/organization', organization.index);
routes.get('/organization/details', organization.show);
routes.put('/organization', organization.update);
routes.delete('/organization', organization.destroy);

//routes.get('/blabla', jwt.verify, blablaController.get);
export default routes;
