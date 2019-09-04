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

  static associate(models) {
    this.hasMany(models.Schedule, { foreignKey: 'course_id', as: 'course' });
  }
}

export default Course;
