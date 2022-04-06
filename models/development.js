'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Development extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Development.init({
    user_id: DataTypes.STRING,
    project_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Development',
  });
  return Development;
};