import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        matricula: Sequelize.STRING,
        nome_usual: Sequelize.STRING,
        tipo_vinculo: Sequelize.STRING,
        cpf: Sequelize.STRING,
        data_de_nascimento: Sequelize.STRING,
        email_suap: Sequelize.STRING,
        email: Sequelize.STRING,
        avatar_suap: Sequelize.STRING,
        nome_completo: Sequelize.STRING,
        curso: Sequelize.STRING,
        curso_ano: Sequelize.INTEGER,
        curso_turno: Sequelize.STRING,
        campus: Sequelize.STRING,
        situacao: Sequelize.STRING,
        curriculo_lattes: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Playerid, { foreignKey: 'user_id', as: 'devices' });
    this.hasMany(models.Answer, { foreignKey: 'user_id', as: 'user' });
  }
}

export default User;
