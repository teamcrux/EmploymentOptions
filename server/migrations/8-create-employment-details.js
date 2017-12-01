'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmploymentDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization: { type: Sequelize.STRING },
      job_title: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      location: { type: Sequelize.STRING },
      job_duties: { type: Sequelize.JSON },
      pay: {
        type: Sequelize.STRING
      },
      leaving_reason: {
        type: Sequelize.TEXT
      },
      leaving_reason_explain: { type: Sequelize.STRING },
      start: {
        type: Sequelize.DATEONLY
      },
      end: {
        type: Sequelize.DATEONLY
      },
      difficulties: { type: Sequelize.BOOLEAN },
      difficulties_explain: { type: Sequelize.STRING },
      full_time: { type: Sequelize.BOOLEAN },
      part_time: { type: Sequelize.BOOLEAN },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ClientId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Clients',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmploymentDetails');
  }
};
