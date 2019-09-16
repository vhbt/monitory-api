import Question from '../models/Question';
import Answer from '../models/Answer';
import User from '../models/User';

import AuthenticateUserService from '../services/AuthenticateUserService';

class QuestionController {
  async index(req, res) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 1;

      const questions = await Question.findAll({
        limit,
        offset: (page - 1) * limit,
        order: [
          ['created_at', 'DESC'],
          [{ model: Answer, as: 'answers' }, 'created_at', 'DESC'],
        ],
        include: [
          {
            model: Answer,
            as: 'answers',
            attributes: ['id', 'content', 'user_id', 'created_at'],
            include: [
              {
                model: User,
                as: 'user',
                attributes: [
                  'id',
                  'nome_usual',
                  'curso',
                  'curso_ano',
                  'curso_turno',
                ],
              },
            ],
          },
        ],
      });

      const totalCountResponse = await Question.findAll();
      const totalCount = totalCountResponse.length;

      if (req.query.new) {
        return res.json({ totalCount, questions });
      }

      return res.json(questions);
    } catch (err) {
      return res.status(500).json({ type: 'error', detail: err });
    }
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
