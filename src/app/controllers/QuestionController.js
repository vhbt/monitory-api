import Question from '../models/Question';
import User from '../models/User';

import AuthenticateUserService from '../services/AuthenticateUserService';

class QuestionController {
  async index(req, res) {
    const question = await Question.findAll({
      limit: 1,
      order: [['created_at', 'DESC']],
    });

    return res.json(question);
  }

  async store(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });
      }

      const [, token] = authHeader.split(' ');

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

      const { content } = req.body;

      const questionExists = await Question.findOne({
        where: {
          content,
        },
      });

      if (questionExists)
        return res
          .status(400)
          .json({ type: 'error', message: 'Pergunta existente.' });

      const question = await Question.create({ content });

      return res.json(question);
    } catch (err) {
      return res.status(500).json({ type: 'error', detail: err });
    }
  }
}

export default new QuestionController();
