import logger from './services/logger';
import Playerid from './app/models/Playerid';
import { OneSignalApi } from './services/api';

class OSCleaner {
  async run(req, res) {
    try {
      const response = await OneSignalApi.get(
        `/players?app_id=${process.env.ONESIGNAL_APP_ID}&limit=300&offset=0`
      );

      const invalidPlayers = response.data.players.filter(player => {
        return player.invalid_identifier === true;
      });

      const playersToDelete = [];

      invalidPlayers.map(invalidPlayer => {
        return playersToDelete.push(invalidPlayer.id);
      });

      const destroyResponse = await Playerid.destroy({
        where: { id: playersToDelete },
      });

      return res.json({ type: 'success', detail: destroyResponse });
    } catch (err) {
      logger.error(`error deleting invalid playerids: '${err}`);
      return res.status(500).json({
        type: 'error',
        detail: 'Error while deleting invalid playerds.',
      });
    }
  }
}

export default new OSCleaner();
