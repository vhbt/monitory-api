import { Sequelize, Op } from 'sequelize';
import Event from '../models/Event';
import Candidature from '../models/Candidature';
import User from '../models/User';

import AuthenticateUserService from '../services/AuthenticateUserService';

class EventController {
  async view(req, res) {
    const { id } = req.params;

    const event = await Event.findOne({
      where: { id },
      include: [
        {
          model: Candidature,
          as: 'candidatures',
          attributes: ['id', 'text'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: [
                'id',
                'matricula',
                'nome_completo',
                'avatar_suap',
                'curso',
                'curso_ano',
                'curso_turno',
              ],
            },
          ],
        },
      ],
    });

    return res.json(event);
  }

  async index(req, res) {
    const { past } = req.query;

    const where = {};

    if (!past) {
      where.until_date = {
        [Op.between]: [new Date(), Sequelize.col('until_date')],
      };
    }

    const events = await Event.findAll({
      order: [['date', 'desc']],
      where,
      include: [
        {
          model: Candidature,
          as: 'candidatures',
          attributes: ['id', 'text'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: [
                'id',
                'matricula',
                'nome_completo',
                'avatar_suap',
                'curso',
                'curso_ano',
                'curso_turno',
              ],
            },
          ],
        },
      ],
    });

    return res.json(events);
  }

  async store(req, res) {
    try {
      const {
        title,
        desc,
        featured,
        type,
        image,
        enabled,
        date,
        until_date,
      } = req.body;

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });
      }

      const [, token] = authHeader.split(' ');

      await AuthenticateUserService.run({ token, needsAdmin: true });

      const eventAlreadyExists = await Event.findOne({
        where: {
          title,
        },
      });

      if (eventAlreadyExists) {
        return res.status(401).json({
          type: 'error',
          detail: 'Já existe um evento com esse nome.',
        });
      }

      const event = await Event.create({
        title,
        desc,
        featured,
        type,
        image,
        enabled,
        date,
        until_date,
      });

      return res.json(event);
    } catch (err) {
      return res.status(err.status || err.response.status).json({
        type: 'error',
        detail: err.response.statusText || err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id, title } = req.body;

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ type: 'error', detail: 'Não autorizado.' });
      }

      const [, token] = authHeader.split(' ');

      await AuthenticateUserService.run({ token, needsAdmin: true });

      const eventExists = await Event.findOne({
        where: {
          id,
        },
      });

      if (!eventExists) {
        return res.status(401).json({
          type: 'error',
          detail: 'Evento inexistente.',
        });
      }

      if (title) {
        const eventTitleAlreadyExists = await Event.findOne({
          where: {
            title,
          },
        });

        if (eventTitleAlreadyExists) {
          return res.status(401).json({
            type: 'error',
            detail: 'Já existe um evento com esse nome.',
          });
        }
      }

      await eventExists.update(req.body);

      return res.json(eventExists);
    } catch (err) {
      return res.status(err.status || err.response.status).json({
        type: 'error',
        detail: err.response.statusText || err.message,
      });
    }
  }
}

export default new EventController();
