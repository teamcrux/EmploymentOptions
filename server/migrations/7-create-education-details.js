'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EducationDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      college: {
        type: Sequelize.BOOLEAN
      },
      high_school: {
        type: Sequelize.BOOLEAN
      },
      vocational: {
        type: Sequelize.BOOLEAN
      },
      ged: {
        type: Sequelize.BOOLEAN
      },
      hs_diploma: {
        type: Sequelize.BOOLEAN
      },
      certificate: {
        type: Sequelize.STRING
      },
      diploma_type: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      AddressId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Addresses',
          key: 'id'
        },
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
    return queryInterface.dropTable('EducationDetails');
  }
};