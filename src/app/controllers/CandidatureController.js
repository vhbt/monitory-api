import Candidature from '../models/Candidature';

import AuthenticateUserService from '../services/AuthenticateUserService';

class CandidatureController {
  async store(req, res) {
    try {
      const { user_id, event_id, text } = req.body;

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });
      }

      const [, token] = authHeader.split(' ');

      await AuthenticateUserService.run({ token, needsAdmin: true });

      const candidatureExists = await Candidature.findOne({
        where: {
          user_id,
          event_id,
        },
      });

      if (candidatureExists) {
        return res.status(401).json({
          type: 'error',
          detail: 'Candidato já cadastrado nesse evento.',
        });
      }

      const candidatures = await Candidature.create({
        user_id,
        event_id,
        text,
      });

      return res.json(candidatures);
    } catch (err) {
      return res.status(err.status || err.response.status).json({
        type: 'error',
        detail: err.response.statusText || err.message,
      });
    }
  }
}

export default new CandidatureController();
