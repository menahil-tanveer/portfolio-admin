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
router.post("/get-all-testimonials", testimonialController.getAllTestimonials);
router.get(
  "/get-testimonial/:test_id",
  testimonialController.getTestimonialById
);
router.patch(
  "/update-testimonial/:test_id",
  testimonialController.updateTestimonial
);
router.delete(
  "/delete-testimonial/:test_id",
  testimonialController.deleteTestimonial
);

module.exports = router;
