import Vote from '../models/Vote';

import AuthenticateUserService from '../services/AuthenticateUserService';

class VoteController {
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
