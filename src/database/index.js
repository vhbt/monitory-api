import Sequelize from 'sequelize';

import User from '../app/models/User';
import News from '../app/models/News';
import Course from '../app/models/Course';
import Schedule from '../app/models/Schedule';
import Playerid from '../app/models/Playerid';
import Question from '../app/models/Question';
import Answer from '../app/models/Answer';
import Event from '../app/models/Event';
import Candidature from '../app/models/Candidature';
import Vote from '../app/models/Vote';

import databaseConfig from '../config/database';

const models = [
  User,
  News,
  Course,
  Schedule,
  Playerid,
  Question,
  Answer,
  Event,
  Candidature,
  Vote,
];

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
