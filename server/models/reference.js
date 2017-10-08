'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reference = sequelize.define('Reference', {
    first_name: { type: DataTypes.STRING, },
    last_name: { type: DataTypes.STRING, },
    phone: { type: DataTypes.STRING, },
    years_known: { type: DataTypes.INTEGER, },
    notes: { type: DataTypes.TEXT, },
    business: { type: DataTypes.BOOLEAN, },
    personal: { type: DataTypes.BOOLEAN }
  }, {
    classMethods: {
      associate: (models) => {
        Reference.belongsTo(models.Client, {
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Reference;
};