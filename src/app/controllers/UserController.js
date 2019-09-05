import User from '../models/User';
import Playerid from '../models/Playerid';
import AuthenticateUserService from '../services/AuthenticateUserService';

class UserController {
  async index(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ type: 'error', detail: 'Não autorizado.' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const { id } = await AuthenticateUserService.run({ token });

      const userIsAdmin = await User.findOne({
        where: {
          id,
          admin: true,
        },
        order: [['created_at', 'DESC']],
      });

      if (!userIsAdmin)
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });

      const page = req.query.page || 1;
      const limit = req.query.limit || 8;

      const totalCountResponse = await User.findAll();
      const totalCount = totalCountResponse.length;

      const users = await User.findAll({
        limit,
        offset: (page - 1) * limit,
        order: [['created_at', 'DESC']],
      });

      return res.json({
        totalCount,
        users,
      });
    } catch (err) {
      return res.status(401).json({ type: 'error', detail: 'Não autorizado.' });
    }
  }

  async store(req, res) {
    const { token, oneSignalPlayerId } = req.body;

    try {
      const response = await AuthenticateUserService.run({
        token,
        playerid: oneSignalPlayerId,
      });

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ type: 'error', detail: err });
    }
  }

  async update(req, res) {
    const { id, email, curso_ano, curso_turno, playerId } = req.body;

    try {
      const user = await User.findByPk(id);

      user.email = email;
      user.curso_ano = curso_ano;
      user.curso_turno = curso_turno;
      user.save();

      if (playerId) {
        const playerid = await Playerid.findByPk(playerId);

        playerid.year = curso_ano;
        playerid.turn = curso_turno;

        playerid.save();
      }

      return res.json({ email, curso_ano, curso_turno });
    } catch (err) {
      return res.status(400).json({ type: 'error', detail: err });
    }
  }
}

export default new UserController();
