const express = require("express");
const { addEntry, bulkAddEntry } = require("../controllers/dataEntries");
const router = express.Router();

router.put("/addEntry", addEntry);
router.put("/bulkAddEntry", bulkAddEntry);

module.exports = router;
