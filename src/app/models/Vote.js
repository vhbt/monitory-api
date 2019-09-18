import { Model } from 'sequelize';

class Vote extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
    this.belongsTo(models.Candidature, {
      foreignKey: 'candidature_id',
      as: 'candidature',
    });
  }
}

export default Vote;
