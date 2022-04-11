/**
 *
 * Author: Menahil
 * Created: 06-04-2022
 * Purpose: This file contains all the routes for users
 *
 */
const express = require("express");
const router = express.Router();
const { validateUser, validateUpdationData } = require("../middlewares/user");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");


router.post("/create-new-user", [validateUser], userController.createUser);
router.get("/get-user/:user_id", userController.getUserById);
router.patch(
  "/update-user/:user_id",
  [validateUpdationData],
  userController.updateUser
);
router.delete("/delete-user/:user_id", userController.deleteUser);
router.post("/login", authController.login);
router.post("/logout", authController.logout);


module.exports = router;
