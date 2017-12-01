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
    difficulties: { type: Sequelize.BOOLEAN },
    difficulties_explain: { type: Sequelize.STRING },
    full_time: { type: Sequelize.BOOLEAN },
    part_time: { type: Sequelize.BOOLEAN },
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
