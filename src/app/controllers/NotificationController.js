import logger from '../../services/logger';
import { OneSignalApi } from '../../services/api';

class NotificationController {
  async store(req, res) {
    try {
      const { title, message, playerids } = req.body;

      logger.info(
        `creating notification '${title}' with message '${message}' to ${playerids.length} playerids`
      );

      const response = await OneSignalApi.post('notifications', {
        app_id: process.env.ONESIGNAL_APP_ID,
        include_player_ids: playerids,
        headings: { en: title },
        contents: { en: message },
      });

      return res.json(response.data);
    } catch (err) {
      logger.error(`error while creating notification: '${err}'`);
      return res.status(500).json(err);
    }
  }
}

export default new NotificationController();
