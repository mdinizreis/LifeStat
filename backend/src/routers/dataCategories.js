const express = require("express");
const { seedCategories } = require("../controllers/dataCategories");
const router = express.Router();

router.get("/seedCategories", seedCategories);

module.exports = router;
