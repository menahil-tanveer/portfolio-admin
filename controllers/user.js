// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const userModel = require("../models").User;
const projectModel = require("../models").Project;
const socialAccountModel = require("../models").SocialAccount;
const testimonialModel = require("../models").Testimonial;
const educationModel = require("../models").Education;

// ---------------------------------------------- CREATE ----------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for adding user to db
 */
const createUser = async (req, res) => {
  let { user_id, name, email, password } = req.body;
  try {
    const newUser = await userModel.create({
      user_id,
      name,
      email,
      password,
      image: null,
      about: null,
      portfolio_url: null,
    });
    res.status(200).send(newUser);
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res.status(400).json({
        error: error.errors[0].message,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
// ---------------------------------------------- GET -------------------------------------------------------
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getUserById = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: {
        user_id: req.params.user_id,
      },
      include: [
        projectModel,
        socialAccountModel,
        testimonialModel,
        educationModel,
      ],
    });
    if (!user)
      res.status(404).send({
        message: "User not found",
      });
    else {
      const {
        user_id,
        name,
        email,
        password,
        about,
        portfolio_url,
        image,
        Projects,
        SocialAccounts,
        Testimonials,
        Education,
      } = user;
      res.status(200).send({
        user_id,
        name,
        email,
        password,
        about,
        portfolio_url,
        image,
        Projects,
        Socials: SocialAccounts,
        Testimonials,
        Education,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ---------------------------------------------- UPDATE -------------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for updating user data in database
 */
const updateUser = async (req, res) => {
  try {
    console.log("req.params.id:::::::", req.body);
    const user = await userModel.findOne({
      where: {
        user_id: req.params.user_id,
      },
    });
    if (!user)
      res.status(404).send({
        message: "User not found",
      });
    else {
      const updatedUser = await user.update(req.body);
      await user.save();
      res.status(200).send({
        message: "User successfully updated!",
        user: updatedUser,
      });
    }
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res.status(400).json({
        error: error.errors[0].message,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
// ---------------------------------------------- DELETE -------------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for deleting user from database
 */
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: {
        user_id: req.params.user_id,
      },
    });
    if (!user)
      res.status(404).send({
        message: "User not found",
      });
    else {
      await user.destroy({
        where: {
          user_id: req.params.user_id,
        },
      });
      res.status(200).send({
        message: "User successfully deleted!",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
