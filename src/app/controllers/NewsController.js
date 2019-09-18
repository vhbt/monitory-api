import logger from '../../services/logger';
import News from '../models/News';

import AuthenticateUserService from '../services/AuthenticateUserService';

class NewsController {
  async index(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const news = await News.findAll({
      limit,
      offset: (page - 1) * limit,
      order: [['created_at', 'DESC']],
    });

    return res.json(news);
  }

  async store(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ type: 'error', detail: 'Não autorizado.' });
    }

    const [, token] = authHeader.split(' ');

    try {
      await AuthenticateUserService.run({ token, needsAdmin: true });

      const { title, content, category, banner, banner_thumb } = req.body;

      const news = await News.create({
        title,
        content,
        category,
        banner,
        banner_thumb,
      });

      return res.json(news);
    } catch (err) {
      logger.error(`error creating news: '${err}`);
      return res.status(err.status || err.response.status).json({
        type: 'error',
        detail: err.response.statusText || err.message,
      });
    }
  }

  async delete(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ type: 'error', detail: 'Não autorizado.' });
    }

    const [, token] = authHeader.split(' ');

    try {
      await AuthenticateUserService.run({ token, needsAdmin: true });

      const { id } = req.body;

      await News.destroy({
        where: {
          id,
        },
      });

      logger.info(`deleted news '${id}'`);

      return res.json({ type: 'success', detail: 'Notícia deletada!' });
    } catch (err) {
      logger.error(`error deleting news: '${err}`);
      return res.status(err.status || err.response.status).json({
        type: 'error',
        detail: err.response.statusText || err.message,
      });
    }
  }
}

export default new NewsController();
