import Question from '../models/Question';
import Answer from '../models/Answer';

class AnswerController {
  async store(req, res) {
    try {
      const { content, question_id, user_id } = req.body;

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
      return res.status(500).json({ type: 'error', detail: err });
    }
  }
}

export default new AnswerController();
