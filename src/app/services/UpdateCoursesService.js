import { SuapApi } from '../../services/api';
import Course from '../models/Course';

class UpdateCoursesService {
  async run({ courses }) {
    const suap = await SuapApi.post('/autenticacao/token/', {
      username: process.env.SUAP_LOGIN,
      password: process.env.SUAP_PASS,
    });

    if (suap.data.token) {
      SuapApi.defaults.headers.Authorization = `JWT ${suap.data.token}`;
    } else {
      throw new Error('Unauthorized.');
    }

    const promises = courses.map(async course => {
      try {
        const courseResponse = await SuapApi.get(`/edu/cursos/${course}/`);

        const { codigo } = courseResponse.data;
        const exists = await Course.findByPk(codigo);

        if (exists) {
          return false;
        }

        const {
          codigo: cod,
          descricao,
          modalidade,
          coordenador,
          diretoria,
        } = courseResponse.data;

        return {
          id: cod,
          description: descricao,
          diretory: diretoria,
          category: modalidade,
          coordinator: coordenador,
        };
      } catch (err) {
        return false;
      }
    });

    try {
      const results = await Promise.all(promises);

      const queries = results.map(async result => {
        if (result) {
          const response = await Course.create(result);
          return response;
        }
        return null;
      });

      return Promise.all(queries);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new UpdateCoursesService();
