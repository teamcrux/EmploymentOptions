'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    type_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        UserType.hasMany(models.User, {foreignKey: 'userTypeId'});
      }
    }
  });
  return UserType;
};