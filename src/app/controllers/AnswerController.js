import Question from '../models/Question';
import Answer from '../models/Answer';

import AuthenticateUserService from '../services/AuthenticateUserService';

class AnswerController {
  async store(req, res) {
    try {
      const { content, question_id, user_id } = req.body;

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });
      }

      const [, token] = authHeader.split(' ');

      await AuthenticateUserService.run({ token, user_id });

      const questionExists = await Question.findOne({
        where: {
          id: question_id,
        },
      });

      if (!questionExists)
        return res
          .status(400)
          .json({ type: 'error', message: 'Pergunta inexistente.' });

      const answer = await Answer.create({ content, question_id, user_id });

      return res.json(answer);
    } catch (err) {
      return res.status(err.status || err.response.status).json({
        type: 'error',
        detail: err.response.statusText || err.message,
      });
    }
  }
}

export default new AnswerController();
