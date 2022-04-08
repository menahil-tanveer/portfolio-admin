/**
 *
 * Author: Menahil
 * Created: 07-04-2022
 * Purpose: This file contains all the routes for education
 *
 */
const express = require("express");
const router = express.Router();
const educationController = require("../controllers/education");
const {
  validateEducation,
  validateEducationUpdate,
} = require("../middlewares/education");
router.post(
  "/add-education",
  [validateEducation],
  educationController.addEducation
);
router.post(
  "/get-educational-background",
  educationController.getEducationalBackground
);
router.patch(
  "/update-educational-background/:id",
  [validateEducationUpdate],
  educationController.updateEducationalBackground
);
router.delete("/delete-education/:id", educationController.deleteEducation);

module.exports = router;
