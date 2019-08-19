import { Router } from 'express';

import UserController from './app/controllers/UserController';
import NewsController from './app/controllers/NewsController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateNewsStore from './app/validators/NewsStore';

const routes = new Router();

routes.post('/users', validateUserStore, UserController.store);
routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/news', NewsController.index);
routes.post('/news', validateNewsStore, NewsController.store);

export default routes;
