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
        banner_path: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.PUBLIC_URL}${this.banner}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default News;
