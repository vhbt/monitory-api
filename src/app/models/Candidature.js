import Sequelize, { Model } from 'sequelize';

class Candidature extends Model {
  static init(sequelize) {
    super.init(
      {
        text: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsToMany(models.Event, {
      through: 'CandidateEvents',
      foreignKey: 'event_id',
      as: 'event',
    });
    this.belongsToMany(models.Vote, {
      through: 'CandidatureVotes',
      foreignKey: 'candidature_id',
      as: 'candidature',
    });
  }
}

export default Candidature;
