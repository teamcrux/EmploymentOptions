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
    leaving_reason_explain: { type: DataTypes.STRING },
    start: { type: DataTypes.DATEONLY },
    end: { type: DataTypes.DATEONLY },
    difficulties: { type: DataTypes.BOOLEAN },
    difficulties_explain: { type: DataTypes.STRING },
    full_time: { type: DataTypes.BOOLEAN },
    part_time: { type: DataTypes.BOOLEAN },
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
