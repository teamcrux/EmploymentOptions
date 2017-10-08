'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmploymentDetail = sequelize.define('EmploymentDetail', {
    organization: { type: DataTypes.STRING },
    job_title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING},
    location: { type: DataTypes.STRING },
    job_duties: { type: DataTypes.JSON },
    pay: { type: DataTypes.STRING },
    leaving_reason: { type: DataTypes.TEXT },
    start: { type: DataTypes.DATEONLY },
    end: { type: DataTypes.DATEONLY }
  }, {
    classMethods: {
      associate: (models) => {
        EmploymentDetail.belongsTo(models.Client, {
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return EmploymentDetail;
};
