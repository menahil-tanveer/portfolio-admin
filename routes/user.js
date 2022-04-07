/**
 *
 * Author: Menahil
 * Created: 06-04-2022
 * Purpose: This file contains all the routes for users
 *
 */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const projectController = require("../controllers/project");

router.post("/create-new-user", userController.createUser);
router.post("/addProject", projectController.addNewProject);

router.get("/get-user/:user_id", userController.getUserById);
router.patch("/update-user/:user_id", userController.updateUser);
router.delete("/delete-user/:user_id", userController.deleteUser);

module.exports = router;
