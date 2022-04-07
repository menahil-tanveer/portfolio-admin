/**
 *
 * Author: Menahil
 * Created: 07-04-2022
 * Purpose: This file contains all the routes for testimonials
 *
 */
const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonial");

router.post("/add-new-testimonial", testimonialController.addNewTestimonial);
//  router.get("/get-all-projects", testimonialController.getAllProjects);
//  router.get("/get-project/:project_id", testimonialController.getProjectById);
//  router.patch("/update-project/:project_id", testimonialController.updateProject);
//  router.delete("/delete-project/:project_id", testimonialController.deleteProject);

module.exports = router;
