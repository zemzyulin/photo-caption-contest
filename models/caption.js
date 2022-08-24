'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    static associate(models) {
      Caption.belongsTo(models.Photo, {
        foreignKey: 'photos_id',
        as: 'photo'
      });
      Caption.belongsTo(models.User, {
        foreignKey: 'users_id',
        as: 'user'
      });
    }
  }
  Caption.init({
    caption: DataTypes.STRING,
    users_id: DataTypes.INTEGER,
    photos_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caption',
  });
  return Caption;
};