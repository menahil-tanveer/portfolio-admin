/**
 *
 * Author: Menahil
 * Created: 07-04-2022
 * Purpose: This file contains all the controllers for projects
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
 * @description This method is responsible for adding socials in user portfolio
 */
const addNewSocial = async (req, res) => {
  let { user_id, name, social_url } = req.body;
  try {
    let user = await userModel.findByPk(user_id);
    if (!user)
      res.status(404).send({
        message: "User not found!",
      });
    else {
      await socialAccountModel.create({
        user_id,
        name,
        social_url,
      });
      res.status(200).send({
        message: "New social account added!",
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
 * @description This method is responsible for fetching all the socials in user's portfolio
 */
const getAllSocials = async (req, res) => {
  try {
    const socials = await socialAccountModel.findAll();
    res.status(200).send({ socials });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getSocialById = async (req, res) => {
  try {
    const socialAccount = await socialAccountModel.findOne({
      where: {
        social_id: req.params.social_id,
      },
    });
    if (!socialAccount)
      res.status(404).send({
        message: "Social account not found!",
      });
    else {
      res.status(200).send({ social: socialAccount });
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
 * @description This method is responsible for updating social account details
 */
const updateSocial = async (req, res) => {
  try {
    const socialAccount = await socialAccountModel.findOne({
      where: {
        social_id: req.params.social_id,
      },
    });
    if (!socialAccount)
      res.status(404).send({
        message: "Social account not found",
      });
    else {
      const updatedSocialAccount = await socialAccount.update(req.body);
      await socialAccount.save();
      res.status(200).send({
        message: "Social account successfully updated!",
        project: updatedSocialAccount,
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
 * @description This method is responsible for removing project from user's portfolio
 */
const deleteSocial = async (req, res) => {
  try {
    const socialAccount = await socialAccountModel.findOne({
      where: {
        social_id: req.params.social_id,
      },
    });
    if (!socialAccount)
      res.status(404).send({
        message: "Social account not found",
      });
    else {
      await socialAccount.destroy({
        where: {
          social_id: req.params.social_id,
        },
      });
      res.status(200).send({
        message: "Social account successfully deleted!",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addNewSocial,
  getAllSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
};
