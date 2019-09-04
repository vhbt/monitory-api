import Sequelize, { Model } from 'sequelize';

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.INTEGER,
        year: Sequelize.INTEGER,
        turn: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' });
  }
}

export default Schedule;
