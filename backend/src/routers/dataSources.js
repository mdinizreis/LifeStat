const express = require("express");
const { seedSources } = require("../controllers/dataSources");
const router = express.Router();

router.get("/seedSources", seedSources);

module.exports = router;
