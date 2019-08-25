import Sequelize, { Model } from 'sequelize';

class News extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        content: Sequelize.TEXT,
        category: Sequelize.STRING,
        banner: Sequelize.STRING,
        banner_thumb: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default News;
