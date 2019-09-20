import Vote from '../models/Vote';
import Candidature from '../models/Candidature';

import AuthenticateUserService from '../services/AuthenticateUserService';
import User from '../models/User';

class VoteController {
  async index(req, res) {
    try {
      const { id } = req.params;

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });
      }

      const [, token] = authHeader.split(' ');

      await AuthenticateUserService.run({
        token,
        needsAdmin: true,
      });

      const votesRaw = await Vote.aggregate('candidature_id', 'COUNT', {
        where: {
          event_id: id,
        },
        include: [
          {
            model: Candidature,
            as: 'candidature',
            include: [
              {
                model: User,
                as: 'user',
              },
            ],
          },
        ],
        plain: false,
        group: ['candidature_id', 'candidature.id', 'candidature->user.id'],
      });

      const votes = votesRaw.map(vote => ({
        name: vote['candidature.user.nome_usual'],
        votes: Number(vote.COUNT),
      }));

      return res.json(votes);
    } catch (err) {
      return res
        .status(err.status)
        .json({ type: 'error', detail: err.message });
    }
  }

  async store(req, res) {
    try {
      const { user_id, event_id, candidature_id } = req.body;

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });
      }

      const [, token] = authHeader.split(' ');

      await AuthenticateUserService.run({
        token,
        user_id,
      });

      const alreadyVoted = await Vote.findOne({
        where: {
          user_id,
          event_id,
        },
      });

      if (alreadyVoted) {
        return res
          .status(401)
          .json({ type: 'error', detail: 'Você já votou nesse evento.' });
      }

      const vote = await Vote.create({
        user_id,
        event_id,
        candidature_id,
      });

      return res.json(vote);
    } catch (err) {
      return res
        .status(err.status)
        .json({ type: 'error', detail: err.message });
    }
  }
}

export default new VoteController();
