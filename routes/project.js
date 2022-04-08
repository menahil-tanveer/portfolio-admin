/**
 *
 * Author: Menahil
 * Created: 07-04-2022
 * Purpose: This file contains all the routes for projects
 *
 */
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const {
  validateProject,
  validateProjectUpdate,
} = require("../middlewares/project");

router.post(
  "/add-new-project",
  [validateProject],
  projectController.addNewProject
);
router.post("/get-all-projects", projectController.getAllProjects);
router.get("/get-project/:project_id", projectController.getProjectById);
router.patch(
  "/update-project/:project_id",
  [validateProjectUpdate],
  projectController.updateProject
);
router.delete("/delete-project/:project_id", projectController.deleteProject);

module.exports = router;
