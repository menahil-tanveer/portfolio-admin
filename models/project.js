"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsToMany(models.User, {
        through: "Development",
        foreignKey: "project_id",
      });
    }
  }
  Project.init(
    {
      project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      project_name: {
        type: DataTypes.STRING,
        len: [2, 100],
        is: /^[a-zA-Z ]+$/i,
        notEmpty: true,
      },
      project_url: DataTypes.STRING,
      git_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
