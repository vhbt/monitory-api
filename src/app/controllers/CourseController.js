import Course from '../models/Course';
import UpdateCoursesService from '../services/UpdateCoursesService';

class CourseController {
  async index(req, res) {
    const response = await Course.findAll({ order: ['created_at', 'DESC'] });

    return res.json(response);
  }

  async store(req, res) {
    const { courses } = req.body;
    const response = await UpdateCoursesService.run({ courses });

    res.json(response);
  }
}

export default new CourseController();
