'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.hasMany(models.Caption, {
        foreignKey: 'photos_id',
        as: 'captions'
      })
    }
  }
  Photo.init({
    url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};