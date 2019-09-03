import Sequelize from 'sequelize';

import User from '../app/models/User';
import News from '../app/models/News';
import Course from '../app/models/Course';

import databaseConfig from '../config/database';

const models = [User, News, Course];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
