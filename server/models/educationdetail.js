'use strict';
module.exports = (sequelize, DataTypes) => {
  const EducationDetail = sequelize.define('EducationDetail', {
    name: { type: DataTypes.STRING },
    college: { type: DataTypes.BOOLEAN },
    high_school: { type: DataTypes.BOOLEAN },
    vocational: { type: DataTypes.BOOLEAN },
    ged: { type: DataTypes.BOOLEAN },
    hs_diploma: { type: DataTypes.BOOLEAN },
    certificate: { type: DataTypes.STRING },
    diploma_type: { type: DataTypes.STRING },
    notes: { type: DataTypes.TEXT }
  }, {
    classMethods: {
      associate: (models) => {
        EducationDetail.belongsTo(models.Client, {
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return EducationDetail;
};