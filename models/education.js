"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Education.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Education.init(
    {
      edu_id: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      degree: {
        type: DataTypes.STRING,
        len: [2, 100],
        is: /^[a-zA-Z ]+$/i,
        notEmpty: true,
      },
      institution: {
        type: DataTypes.STRING,
        len: [2, 100],
        is: /^[a-zA-Z ]+$/i,
        notEmpty: true,
      },
    },
    {
      sequelize,
      modelName: "Education",
    }
  );
  return Education;
};
