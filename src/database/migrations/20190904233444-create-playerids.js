module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('playerids', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      course_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      turn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      campus: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('playerids');
  },
};
