'use strict'
module.exports = (sequelize, DataTypes) => {
  const TaskData = sequelize.define('TaskData', {
    onetsoc_code: { type: DataTypes.STRING },
    taskId: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return TaskData;
};
