const { Users } = require("../models/Users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.findAll({
      attributes: [
        "user_id",
        "user_username",
        "user_email",
        "user_password",
        "user_join_date",
        "user_last_login",
      ], // Specify the attributes I want to retrieve
    });
    res.json(allUsers);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "Error encountered when fetching all" });
  }
};

module.exports = { getAllUsers };
