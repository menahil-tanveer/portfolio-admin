/**
 *
 * Author: Menahil
 * Created: 07-04-2022
 * Purpose: This file contains all the routes for socials
 *
 */
const express = require("express");
const router = express.Router();
const socialController = require("../controllers/social");

router.post("/add-new-social", socialController.addNewSocial);
router.post("/get-all-socials", socialController.getAllSocials);
router.get("/get-social/:social_id", socialController.getSocialById);
router.patch("/update-social/:social_id", socialController.updateSocial);
router.delete("/delete-social/:social_id", socialController.deleteSocial);

module.exports = router;
