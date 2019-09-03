import User from '../models/User';
import { StudentSuapApi } from '../../services/api';

class AuthenticateUserService {
  async run({ token }) {
    const response = await StudentSuapApi.get(
      '/minhas-informacoes/meus-dados/',
      {
        headers: { Authorization: `JWT ${token}` },
      }
    );

    const {
      id,
      matricula,
      nome_usual,
      tipo_vinculo,
      cpf,
      data_nascimento: data_de_nascimento,
      email: email_suap,
      url_foto_150x200: avatar_suap,
    } = response.data;

    const {
      nome: nome_completo,
      curso,
      campus,
      situacao,
      curriculo_lattes,
    } = response.data.vinculo;

    const userExists = await User.findByPk(id);

    if (userExists) {
      return userExists;
    }

    const newUser = await User.create({
      id,
      matricula,
      nome_usual,
      tipo_vinculo,
      cpf,
      data_de_nascimento,
      email_suap,
      avatar_suap,
      nome_completo,
      curso,
      campus,
      situacao,
      curriculo_lattes,
    });

    return newUser;
  }
}

export default new AuthenticateUserService();
