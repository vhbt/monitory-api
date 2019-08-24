import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import NewsController from './app/controllers/NewsController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateNewsStore from './app/validators/NewsStore';
import validateNewsDelete from './app/validators/NewsDelete';
import validateFileStore from './app/validators/FileStore';

import FileController from './app/controllers/FileController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', validateUserStore, UserController.store);
routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/news', NewsController.index);
routes.post('/news', validateNewsStore, NewsController.store);
routes.delete('/news', validateNewsDelete, NewsController.delete);

routes.post(
  '/files',
  upload.single('file'),
  validateFileStore,
  FileController.store
);

export default routes;
