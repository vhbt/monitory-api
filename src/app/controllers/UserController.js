import User from '../models/User';
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

      const users = await User.findAll();

      return res.json(users);
    } catch (err) {
      return res.status(401).json({ type: 'error', detail: 'Não autorizado.' });
    }
  }

  async store(req, res) {
    const { token } = req.body;

    try {
      const response = await AuthenticateUserService.run({ token });

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ type: 'error', detail: err });
    }
  }

  async update(req, res) {
    const { id, email, curso_ano, curso_turno } = req.body;

    try {
      const user = await User.findByPk(id);

      user.email = email;
      user.curso_ano = curso_ano;
      user.curso_turno = curso_turno;

      user.save();

      return res.json({ email, curso_ano, curso_turno });
    } catch (err) {
      return res.status(400).json({ type: 'error', detail: err });
    }
  }
}

export default new UserController();
