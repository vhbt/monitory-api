import logger from '../../services/logger';
import { OneSignalApi } from '../../services/api';

import AuthenticateUserService from '../services/AuthenticateUserService';

class NotificationController {
  async store(req, res) {
    try {
      const { title, message, playerids } = req.body;
      const priority = req.body.priority || 5;

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });
      }

      const [, token] = authHeader.split(' ');

      await AuthenticateUserService.run({ token, needsAdmin: true });

      logger.info(
        `creating notification '${title}' with message '${message}' to ${playerids.length} playerids`
      );

      const response = await OneSignalApi.post('notifications', {
        app_id: process.env.ONESIGNAL_APP_ID,
        include_player_ids: playerids,
        headings: { en: title },
        contents: { en: message },
        priority,
      });

      return res.json(response.data);
    } catch (err) {
      logger.error(`error while creating notification: '${err}'`);
      return res.status(err.status || err.response.status).json({
        type: 'error',
        detail: err.response.statusText || err.message,
      });
    }
  }
}

export default new NotificationController();
