'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTestimonials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserTestimonials.init({
    user_id: DataTypes.STRING,
    test_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTestimonials',
  });
  return UserTestimonials;
};