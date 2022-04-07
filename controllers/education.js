/**
 *
 * Author: Menahil
 * Created: 07-04-2022
 * Purpose: This file contains all the controllers for education
 *
 */
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
 * @description This method is responsible for adding an educational degree in user's portfolio
 */
const addEducation = async (req, res) => {
  let { user_id, degree, institution } = req.body;
  try {
    let user = await userModel.findByPk(user_id);
    if (!user)
      res.status(404).send({
        message: "User not found!",
      });
    else {
      await educationModel.create({
        user_id,
        degree,
        institution,
      });
      res.status(200).send({
        message: "Education added!",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ---------------------------------------------- GET -------------------------------------------------------
/**
 *
 * @param {*} req
 * @param {*} res
 * @description This method is responsible for fetching complete educational background of the user
 */
const getEducationalBackground = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: {
        user_id: req.body.user_id,
      },
      include: [educationModel],
    });
    if (!user)
      res.status(404).send({
        message: "User not found!",
      });
    else {
      res.status(200).send({ educational_background: user.Education });
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
 * @description This method is responsible for updating educational details
 */
const updateEducationalBackground = async (req, res) => {
  try {
    const education = await educationModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!education)
      res.status(404).send({
        message: "Not found",
      });
    else {
      await education.update(req.body);
      await education.save();
      res.status(200).send({
        message: "Educational background updated!",
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
 * @description This method is responsible for removing an educational degree from user's portfolio
 */
const deleteEducation = async (req, res) => {
  try {
    const education = await educationModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!education)
      res.status(404).send({
        message: "Degree not found",
      });
    else {
      await education.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({
        message: "Degree successfully deleted!",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addEducation,
  getEducationalBackground,
  updateEducationalBackground,
  deleteEducation,
};
