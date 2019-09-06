import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import NewsController from './app/controllers/NewsController';
import FileController from './app/controllers/FileController';
import CourseController from './app/controllers/CourseController';
import ScheduleController from './app/controllers/ScheduleController';
import PlayeridController from './app/controllers/PlayeridController';
import NotificationController from './app/controllers/NotificationController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateNewsStore from './app/validators/NewsStore';
import validateNewsDelete from './app/validators/NewsDelete';
import validateFileStore from './app/validators/FileStore';
import validateCourseStore from './app/validators/CourseStore';
import validatePlayeridDelete from './app/validators/PlayeridDelete';
import validateNotificationStore from './app/validators/NotificationStore';

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

routes.delete('/playerid', validatePlayeridDelete, PlayeridController.delete);

routes.post(
  '/notifications',
  validateNotificationStore,
  NotificationController.store
);

routes.get('/scrape-schedules', scrapeSchedules.run);

export default routes;
