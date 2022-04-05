"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        validate: {
          len: [1, 100],
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("user_id", value.toUpperCase().trim());
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 100],
          is: /^[a-zA-Z ]+$/i,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("name", value.toUpperCase().trim());
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        len: [2, 50],
        validate: {
          notEmpty: true,
          isEmail: true,
        },
        set(value) {
          this.setDataValue("email", value.toLowerCase().trim());
        },
      },
      password: {
        type: DataTypes.STRING,
        len: [8, 64],
        validate: {
          notEmpty: true,
        },
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        },
      },
      about: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 100],
          is: /^[a-zA-Z0-9 ]+$/i,
          notEmpty: true,
        },
      },
      portfolio_url: DataTypes.STRING,
      image: {
        type: DataTypes.BLOB,
        notEmpty: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
