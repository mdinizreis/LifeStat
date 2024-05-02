const express = require("express");
const {
  addEntry,
  bulkAddEntry,
  getTotalSleepDuration,
} = require("../controllers/dataEntries");
const router = express.Router();

router.put("/addEntry", addEntry);
router.put("/bulkAddEntry", bulkAddEntry);
router.get("/getTotalSleepDuration", getTotalSleepDuration);

module.exports = router;
