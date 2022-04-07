'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSocials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSocials.init({
    user_id: DataTypes.STRING,
    social_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSocials',
  });
  return UserSocials;
};