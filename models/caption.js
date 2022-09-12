'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    static associate(models) {
      Caption.belongsTo(models.Photo, {
        foreignKey: 'photosId',
        as: 'photo'
      });
      Caption.belongsTo(models.User, {
        foreignKey: 'usersId',
        as: 'user'
      });
    }
  }
  Caption.init({
    content: DataTypes.STRING,
    usersId: DataTypes.INTEGER,
    photosId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caption',
  });
  return Caption;
};