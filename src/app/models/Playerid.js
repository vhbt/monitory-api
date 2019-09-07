import Sequelize, { Model } from 'sequelize';

class Playerid extends Model {
  static init(sequelize) {
    super.init(
      {
        year: Sequelize.INTEGER,
        turn: Sequelize.STRING,
        campus: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'devices' });
    this.belongsTo(models.Course, { foreignKey: 'course_id' });
  }
}

export default Playerid;
