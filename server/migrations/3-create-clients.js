'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.STRING
      },
      race: {
        type: Sequelize.STRING
      },
      ssn: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      odl: {
        type: Sequelize.STRING
      },
      foodhc: {
        type: Sequelize.BOOLEAN
      },
      registration_date: {
        type: Sequelize.DATEONLY
      },
      military: {
        type: Sequelize.BOOLEAN
      },
      misdemeanor: {
        type: Sequelize.BOOLEAN
      },
      misdemeanor_exp: {
        type: Sequelize.TEXT
      },
      felony: {
        type: Sequelize.BOOLEAN
      },
      felony_exp: {
        type: Sequelize.TEXT
      },
      avail_date: {
        type: Sequelize.DATEONLY
      },
      full_time: {
        type: Sequelize.BOOLEAN
      },
      part_time: {
        type: Sequelize.BOOLEAN
      },
      hours: {
        type: Sequelize.INTEGER
      },
      expectedwage: {
        type: Sequelize.FLOAT
      },
      daysofweek: {
        type: Sequelize.JSON
      },
      willworkdays: {
        type: Sequelize.BOOLEAN
      },
      willworkswing: {
        type: Sequelize.BOOLEAN
      },
      willworknoc: {
        type: Sequelize.BOOLEAN
      },
      inside: {
        type: Sequelize.BOOLEAN
      },
      outside: {
        type: Sequelize.BOOLEAN
      },
      geo_area: {
        type: Sequelize.STRING
      },
      no_work_exp: {
        type: Sequelize.BOOLEAN
      },
      benefits_prof: {
        type: Sequelize.BOOLEAN
      },
      benefits_exp: {
        type: Sequelize.TEXT
      },
      other_agency: {
        type: Sequelize.BOOLEAN
      },
      drivers_license: {
        type: Sequelize.BOOLEAN
      },
      car_access: {
        type: Sequelize.BOOLEAN
      },
      other_transport: {
        type: Sequelize.TEXT
      },
      pass_drug_screen: {
        type: Sequelize.BOOLEAN
      },
      medications: {
        type: Sequelize.TEXT
      },
      resume: {
        type: Sequelize.BOOLEAN
      },
      computer_access: {
        type: Sequelize.BOOLEAN
      },
      can_complete_online_app: {
        type: Sequelize.BOOLEAN
      },
      can_complete_paper_app: {
        type: Sequelize.BOOLEAN
      },
      barriers: {
        type: Sequelize.TEXT
      },
      goal: {
        type: Sequelize.TEXT
      },
      meeting_venue: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.BLOB
      },
      profile: {
        type: Sequelize.TEXT
      },
      interests: {
        type: Sequelize.TEXT
      },
      key_skills: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      addressId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Addresses',
          key: 'id'
        },
      },
      jobDeveloperId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'JobDevelopers',
          key: 'id'
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clients');
  }
};
