'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlternateContact = sequelize.define('AlternateContact', {
    first_name: { type: DataTypes.STRING, },
    last_name: { type: DataTypes.STRING, },
    phone: { type: DataTypes.STRING, },
    relationship: { type: DataTypes.TEXT }
  }, {
    classMethods: {
      associate: (models) => {
        AlternateContact.belongsTo(models.Client, {
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return AlternateContact;
};