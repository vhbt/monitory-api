import Course from '../models/Course';
import UpdateCoursesService from '../services/UpdateCoursesService';

class CourseController {
  async index(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const response = await Course.findAll({
      limit,
      offset: (page - 1) * limit,
      order: ['created_at', 'DESC'],
    });

    return res.json(response);
  }

  async store(req, res) {
    const { courses } = req.body;
    const response = await UpdateCoursesService.run({ courses });

    return res.json(response);
  }
}

export default new CourseController();
