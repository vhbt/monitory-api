import Schedule from '../models/Schedule';
import Course from '../models/Course';

class ScheduleController {
  async index(req, res) {
    const response = await Schedule.findAll({
      include: [
        {
          model: Course,
          as: 'course',
        },
      ],
    });

    return res.json(response);
  }
}

export default new ScheduleController();
