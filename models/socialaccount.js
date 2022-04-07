"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SocialAccount.belongsToMany(models.User, {
        through: "UserSocials",
        foreignKey: "social_id",
      });
    }
  }
  SocialAccount.init(
    {
      social_id: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        len: [2, 100],
        is: /^[a-zA-Z ]+$/i,
        notEmpty: true,
      },
      url: {
        type: DataTypes.STRING,
        notEmpty: true,
      },
    },
    {
      sequelize,
      modelName: "SocialAccount",
    }
  );
  return SocialAccount;
};
