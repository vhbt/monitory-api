import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import NewsController from './app/controllers/NewsController';
import FileController from './app/controllers/FileController';
import CourseController from './app/controllers/CourseController';
import ScheduleController from './app/controllers/ScheduleController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateNewsStore from './app/validators/NewsStore';
import validateNewsDelete from './app/validators/NewsDelete';
import validateFileStore from './app/validators/FileStore';
import validateCourseStore from './app/validators/CourseStore';

import scrapeSchedules from './scraper';

const routes = new Router();

const upload = multer(multerConfig);

routes.get('/', (req, res) => res.send('ok'));

routes.get('/users', UserController.index);
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

routes.get('/courses', CourseController.index);
routes.post('/courses', validateCourseStore, CourseController.store);

routes.get('/schedules', ScheduleController.index);

routes.get('/scrape-schedules', scrapeSchedules.run);

export default routes;
