import Sequelize, { Model } from 'sequelize';

class News extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        content: Sequelize.TEXT,
        tags: Sequelize.STRING,
        banner: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default News;
