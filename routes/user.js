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

router.post("/create-new-user", userController.createUser);

router.get("/get-user/:user_id", userController.getUserById);

router.patch("/update-user/:user_id", userController.updateUser);
router.delete("/delete-user/:user_id", userController.deleteUser);

module.exports = router;