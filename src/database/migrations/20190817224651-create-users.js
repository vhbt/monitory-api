module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      matricula: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      nome_usual: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_vinculo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_de_nascimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_suap: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      avatar_suap: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      nome_completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      curso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      curso_ano: {
        type: Sequelize.INTEGER,
      },
      curso_turno: {
        type: Sequelize.STRING,
      },
      campus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      situacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      curriculo_lattes: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
