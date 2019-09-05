module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeConstraint(
        'users',
        'users_email_suap_key',
        {}
      );
      await queryInterface.changeColumn('users', 'email_suap', {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'email_suap', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
  },
};
