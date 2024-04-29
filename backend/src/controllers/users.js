const { Users } = require("../models/Users");

const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const seedUsers = async (req, res) => {
  try {
    // Delete all existing records from the users table
    await Users.destroy({ where: {} });

    // Seed the database with new user records
    await Users.bulkCreate([
      {
        user_id: "c750d38a-2dbb-481e-bca8-f923ebf6d577",
        user_username: "user1",
        user_email: "user1@email.com",
        user_hash:
          "$2b$12$SnUJ6VpLdgy0A7TdMHZOb.H4zFoK6nLaH3R4JD.cMGUQzd/Bp7/8q", //password
        user_role: "admin",
        user_join_date: new Date(),
        user_last_login: new Date(),
      },
      {
        user_id: "ca9791f8-45a4-4295-93b6-f56d670019f6",
        user_username: "user2",
        user_email: "user2@email.com",
        user_hash:
          "$2b$12$SnUJ6VpLdgy0A7TdMHZOb.H4zFoK6nLaH3R4JD.cMGUQzd/Bp7/8q", //password
        user_role: "user",
        user_join_date: new Date(),
        user_last_login: new Date(),
      },
      {
        user_id: "a624dc2c-fcba-44f1-adb6-cbe84b3799d1",
        user_username: "user3",
        user_email: "user3@email.com",
        user_hash:
          "$2b$12$SnUJ6VpLdgy0A7TdMHZOb.H4zFoK6nLaH3R4JD.cMGUQzd/Bp7/8q", //password
        user_role: "user",
        user_join_date: new Date(),
        user_last_login: new Date(),
      },
      {
        user_id: "eb036021-7920-401b-809b-f4ab0432393e",
        user_username: "user4",
        user_email: "user4@email.com",
        user_hash:
          "$2b$12$SnUJ6VpLdgy0A7TdMHZOb.H4zFoK6nLaH3R4JD.cMGUQzd/Bp7/8q", //password
        user_role: "user",
        user_join_date: new Date(),
        user_last_login: new Date(),
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

const register = async (req, res) => {
  try {
    const existingUsername = await Users.findOne({
      where: {
        user_username: req.body.user_username,
      },
    });
    if (existingUsername) {
      return res
        .status(400)
        .json({ status: "error", msg: "Username already exists" });
    } // this check against the schema for any existing usernames

    const existingEmail = await Users.findOne({
      where: { user_email: req.body.user_email },
    });
    if (existingEmail) {
      return res
        .status(400)
        .json({ status: "error", msg: "Email already exists" });
    } // this check against the schema for any existing emails

    const hashedPassword = await bcrypt.hash(req.body.user_hash, 12);
    await Users.create({
      user_username: req.body.user_username,
      user_email: req.body.user_email,
      user_hash: hashedPassword,
      user_role: req.body.user_role || "user",
      user_join_date: moment().toISOString(),
      user_last_login: moment().toISOString(),
    }); // this creates a hash from the password in the request body and add it to our schema
    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { user_email: req.body.user_email },
    });
    if (!user) {
      return res.status(400).json({ status: "error", msg: "no email found" });
    } //check whether the email/account exist in the database

    //the following code check whether the password matches the one in the db
    const check = await bcrypt.compare(req.body.user_hash, user.user_hash); //check entered password against db password
    if (!check) {
      console.error("invalid password or email");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    //store the payload inside 'claims'
    const claims = {
      id: user.user_id,
      email: user.user_email,
      role: user.user_role,
    };
    console.log(claims);
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res.json({ access, refresh, id: user.user_id });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error logging in" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    console.log(decoded);
    const user = await Users.findOne({
      where: {
        user_email: decoded.email,
      },
    });
    if (!user) {
      return res.status(400).json({ status: "error", msg: "user not found" });
    }

    //store the payload inside the claims
    const claims = {
      user_email: decoded.email,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refreshing token failed" });
  }
};

const update = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.user_hash, 12);

    const updatedUser = {
      user_username: req.body.user_username,
      user_email: req.body.user_email,
      user_hash: hashedPassword,
      user_role: req.body.user_role || "user",
    };

    await Users.update(updatedUser, {
      where: {
        user_id: req.params.user_id,
      },
    });

    res.json({ status: "ok", msg: "user updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "User not updated" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.findAll({
      attributes: [
        "user_id",
        "user_username",
        "user_email",
        "user_hash",
        "user_role",
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

module.exports = { getAllUsers, seedUsers, register, login, refresh, update };
