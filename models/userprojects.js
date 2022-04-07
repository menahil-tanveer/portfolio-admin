'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserProjects.init({
    user_id: DataTypes.STRING,
    project_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProjects',
  });
  return UserProjects;
};