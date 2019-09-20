import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        desc: Sequelize.STRING,
        featured: Sequelize.BOOLEAN,
        enabled: Sequelize.BOOLEAN,
        type: Sequelize.STRING,
        image: Sequelize.STRING,
        date: Sequelize.DATE,
        until_date: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.until_date || this.date, new Date());
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Candidature, {
      foreignKey: 'event_id',
      as: 'candidatures',
    });
    this.hasMany(models.Vote, { foreignKey: 'event_id', as: 'votes' });
  }
}

export default Event;
