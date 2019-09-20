import Question from '../models/Question';
import Answer from '../models/Answer';
import Playerid from '../models/Playerid';
import { OneSignalApi } from '../../services/api';

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

      const adminIds = await Playerid.findAll({
        where: {
          user_id: 234566,
        },
        attributes: ['id'],
      });

      const ids = [];
      adminIds.map(player => ids.push(player.id));

      await OneSignalApi.post('notifications', {
        app_id: process.env.ONESIGNAL_APP_ID,
        include_player_ids: ids,
        headings: { en: 'Novo feedback' },
        contents: { en: content },
      });

      return res.json(answer);
    } catch (err) {
      if (err.status) {
        return res.status(err.status || err.response.status).json({
          type: 'error',
          detail: err.response.statusText || err.message,
        });
      }
      return res.status(500).json(err);
    }
  }
}

export default new AnswerController();
