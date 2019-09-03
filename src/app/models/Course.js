import Sequelize, { Model } from 'sequelize';

class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        diretory: Sequelize.STRING,
        category: Sequelize.STRING,
        coordinator: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Course;
