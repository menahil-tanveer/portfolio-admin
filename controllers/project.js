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
 * @description This method is responsible for adding project in user portfolio
 */
const addNewProject = async (req, res) => {
  let { user_id, project_name, git_url, project_url } = req.body;
  try {
    let user = await userModel.findByPk(user_id);
    if (!user)
      res.status(404).send({
        message: "User not found!",
      });
    else {
      await projectModel.create({
        user_id,
        project_name,
        git_url,
        project_url,
      });
      res.status(200).send({
        message: "Project successfully added!",
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
 * @description This method is responsible for fetching all the projects in user's portfolio
 */
const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.findAll();
    res.status(200).send({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getProjectById = async (req, res) => {
  try {
    const project = await projectModel.findOne({
      where: {
        project_id: req.params.project_id,
      },
    });
    if (!project)
      res.status(404).send({
        message: "Project not found!",
      });
    else {
      res.status(200).send(project);
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
 * @description This method is responsible for updating project details
 */
const updateProject = async (req, res) => {
  try {
    const project = await projectModel.findOne({
      where: {
        project_id: req.params.project_id,
      },
    });
    if (!project)
      res.status(404).send({
        message: "Project not found",
      });
    else {
      const updatedProject = await project.update(req.body);
      await project.save();
      res.status(200).send({
        message: "Project successfully updated!",
        project: updatedProject,
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
const deleteProject = async (req, res) => {
  try {
    const project = await projectModel.findOne({
      where: {
        project_id: req.params.project_id,
      },
    });
    if (!project)
      res.status(404).send({
        message: "Project not found",
      });
    else {
      await user.destroy({
        where: {
          project_id: req.params.project_id,
        },
      });
      res.status(200).send({
        message: "Project successfully deleted!",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addNewProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
