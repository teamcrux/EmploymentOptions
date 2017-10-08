'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobDeveloper = sequelize.define('JobDeveloper', {
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING }
  }, {
    classMethods: {
      associate: (models) => {
        JobDeveloper.hasMany(models.Client);
      },
    }
  });
  return JobDeveloper;
};