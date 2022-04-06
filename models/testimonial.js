"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimonial.init(
    {
      testimonial: {
        type: DataTypes.STRING,
        len: [2, 150],
        is: /^[a-zA-Z0-9!%&()-;:"',?. ]+$/i,
        notEmpty: true,
      },
      client_name: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 100],
          is: /^[a-zA-Z ]+$/i,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("client_name", value.toUpperCase().trim());
        },
      },
    },
    {
      sequelize,
      modelName: "Testimonial",
    }
  );
  return Testimonial;
};
