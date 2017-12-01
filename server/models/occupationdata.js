'use strict'
module.exports = (sequelize, DataTypes) => {
  const OccupationData = sequelize.define('OccupationData', {
    onetsoc_code: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return OccupationData;
};
