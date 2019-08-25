import News from '../models/News';
import User from '../models/User';

import AuthenticateUserService from '../services/AuthenticateUserService';

class NewsController {
  async index(req, res) {
    const news = await News.findAll({
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
      const { id } = await AuthenticateUserService.run({ token });

      const userIsAdmin = await User.findOne({
        where: {
          id,
          admin: true,
        },
      });

      if (!userIsAdmin)
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });

      const {
        title,
        description,
        content,
        category,
        banner,
        banner_thumb,
      } = req.body;

      const news = await News.create({
        title,
        description,
        content,
        category,
        banner,
        banner_thumb,
      });

      return res.json(news);
    } catch (err) {
      return res.status(401).json({ type: 'error', detail: 'Não autorizado.' });
    }
  }

  async delete(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ type: 'error', detail: 'Não autorizado.' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const { id } = await AuthenticateUserService.run({ token });

      const userIsAdmin = await User.findOne({
        where: {
          id,
          admin: true,
        },
      });

      if (!userIsAdmin)
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });

      const { id: news_id } = req.body;

      await News.destroy({
        where: {
          id: news_id,
        },
      });

      return res.json({ type: 'success', detail: 'Notícia deletada!' });
    } catch (err) {
      return res.status(401).json({ type: 'error', detail: 'Não autorizado.' });
    }
  }
}

export default new NewsController();
