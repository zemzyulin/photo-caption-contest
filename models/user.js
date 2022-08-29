'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const jwt = require('jsonwebtoken');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Caption, {
        foreignKey: 'users_id',
        as: 'captions'
      })
    }

    generateJWT() {
      const token = jwt.sign({id: this.id, username: this.username}, config.privatekey, { expiresIn: 60 * 60 });
      console.log(token);
      return token;
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3,20]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7,255]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};