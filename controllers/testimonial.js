/**
 *
 * Author: Menahil
 * Created: 07-04-2022
 * Purpose: This file contains all the controllers for testimonials
 *
 */
const userModel = require("../models").User;
const projectModel = require("../models").Project;

const testimonialModel = require("../models").Testimonial;

// ---------------------------------------------- CREATE ----------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for adding testimonials in user portfolio
 */
const addNewTestimonial = async (req, res) => {
  let { user_id, client_name, testimonial } = req.body;
  try {
    let user = await userModel.findByPk(user_id);
    if (!user)
      res.status(404).send({
        message: "User not found!",
      });
    else {
      await testimonialModel.create({
        user_id,
        client_name,
        testimonial,
      });
      res.status(200).send({
        message: "Testimonial successfully added!",
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
 * @description This method is responsible for fetching all the testimonials in user's portfolio
 */
const getAllTestimonials = async (req, res) => {
  //   try {
  //     const projects = await projectModel.findAll();
  //     res.status(200).send({ projects });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  try {
    const user = await userModel.findOne({
      where: {
        user_id: req.body.user_id,
      },
      include: [testimonialModel],
    });
    if (!user)
      res.status(404).send({
        message: "User not found",
      });
    else {
      res.status(200).send({ user_testimonials: user.Testimonials });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonialModel.findOne({
      where: {
        test_id: req.params.test_id,
      },
    });
    if (!testimonial)
      res.status(404).send({
        message: "Testimonial not found!",
      });
    else {
      res.status(200).send({ testimonial });
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
 * @description This method is responsible for updating testimonial details
 */
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialModel.findOne({
      where: {
        test_id: req.params.test_id,
      },
    });
    if (!testimonial)
      res.status(404).send({
        message: "Testimonial not found",
      });
    else {
      const updatedTestimonial = await testimonial.update(req.body, {
        where: { test_id: req.params.test_id },
      });
      await testimonial.save();
      res.status(200).send({
        message: "Testimonial successfully updated!",
        updated_testimonial: updatedTestimonial,
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
 * @description This method is responsible for removing testimonial from user's portfolio
 */
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await testimonialModel.findOne({
      where: {
        test_id: req.params.test_id,
      },
    });
    if (!testimonial)
      res.status(404).send({
        message: "Testimonial not found",
      });
    else {
      await testimonial.destroy({
        where: {
          test_id: req.params.test_id,
        },
      });
      res.status(200).send({
        message: "Testimonial successfully deleted!",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addNewTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
