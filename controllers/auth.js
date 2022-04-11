/**
 *
 * Author: Menahil
 * Created: 11-04-2022
 * Purpose: This file contains controller logic for user authentication
 *
 */
const userModel = require("../models").User;
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const login = async (req, res) => {
  try {
    const admin = await userModel.findOne({
      where: { user_id: req.body.user_id },
    });
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      // find user and verify password
      const token = jwt.sign(
        // authentication successful
        { id: admin.user_id, user_id: req.body.user_id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      admin.update({
        token,
      });
      res.status(200).json({ admin, token });
    } else res.status(400).json({ error: "Invalid Credentials" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const logout = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: { user_id: req.body.user_id },
    });
    user.update({
      token: null,
    });
    res.status(200).json({ message: "User successfully logged out" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  login,
  logout,
};
