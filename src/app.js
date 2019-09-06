import 'dotenv/config';

import * as Sentry from '@sentry/node';
import express from 'express';
import Youch from 'youch';
import cors from 'cors';
import { resolve } from 'path';

import logger from './services/logger';
import routes from './routes';
import SentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(SentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use('/files', express.static(resolve(__dirname, 'files')));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();
      logger.error(errors);

      if (process.env.NODE_ENV === 'development') {
        return res.status(500).json(errors);
      }
      return res
        .status(500)
        .json({ type: 'error', detail: 'Internal server error.' });
    });
  }
}

export default new App().server;
