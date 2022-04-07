/**
 *
 * Author: Menahil
 * Created: 07-04-2022
 * Purpose: This file contains all the routes for users
 *
 */
 const express = require("express");
 const router = express.Router();
 const socialAccountController = require("../controllers/socialAccount");
 
 router.post("/add-new-social", projectController.addNewProject);
 router.get("/get-all-socials", projectController.getAllProjects);
 router.get("/get-social/:social_id", projectController.getProjectById);
 router.patch("/update-social/:social_id", projectController.updateProject);
 router.delete("/delete-social/:social_id", projectController.deleteProject);
 
 module.exports = router;
 