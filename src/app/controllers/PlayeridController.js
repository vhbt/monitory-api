import Playerid from '../models/Playerid';

class PlayeridController {
  async delete(req, res) {
    try {
      const { oneSignalPlayerId } = req.body;

      const playerid = await Playerid.findOne({
        where: {
          id: oneSignalPlayerId,
        },
      });

      if (playerid) {
        playerid.destroy();

        return res.json({ type: 'success', detail: 'Playerid deletado.' });
      }

      return res.json({});
    } catch (err) {
      return res.status(500).json({ type: 'error', detail: err });
    }
  }
}

export default new PlayeridController();
