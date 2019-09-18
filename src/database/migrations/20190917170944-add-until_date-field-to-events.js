module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('events', 'until_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('events', 'until_date');
  },
};
