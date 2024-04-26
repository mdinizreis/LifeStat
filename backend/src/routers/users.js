const express = require("express");
const { getAllUsers } = require("../controllers/users");

const router = express.Router();

router.get("/allUsers", getAllUsers);

module.exports = router;
