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
      return res.status(401).json({ type: 'error', detail: 'Unauthorized.' });
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
        return res.status(401).json({ type: 'error', detail: 'Unauthorized.' });

      const { title, description, content, tags, banner } = req.body;

      const news = await News.create({
        title,
        description,
        content,
        tags,
        banner,
      });

      return res.json(news);
    } catch (err) {
      return res.status(401).json({ type: 'error', detail: 'Unauthorized.' });
    }
  }

  async delete(req, res) {}
}

export default new NewsController();
