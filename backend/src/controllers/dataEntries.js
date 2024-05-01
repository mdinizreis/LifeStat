const { DataEntries } = require("../models/DataEntries");
const { DataSources } = require("../models/DataSources");
const { DataCategories } = require("../models/DataCategories");
const { Sequelize } = require("sequelize");

const addEntry = async (req, res) => {
  try {
    const sourceInstance = await DataSources.findOne({
      where: {
        source_name: req.body.source_name,
      },
      attributes: ["source_id"],
    });

    if (!sourceInstance) {
      console.log(
        `source_name ${req.body.source_name} does not exist in Data_Sources table`
      );
    }

    const categoryInstance = await DataCategories.findOne({
      where: {
        category_name: req.body.category_name,
      },
      attributes: ["category_id"],
    });

    if (!categoryInstance) {
      console.log(
        `category_name ${req.body.category_name} does not exist in Data_Categories table`
      );
    }

    const existingEntry = await DataEntries.findOne({
      where: {
        user_id: req.body.user_id,
        source_id: sourceInstance.source_id,
        category_id: categoryInstance.category_id,
        // Truncate time part for comparison
        entry_day: {
          [Sequelize.Op.eq]: Sequelize.fn("DATE", req.body.entry_day),
        },
        entry_value: req.body.entry_value,
        entry_type: req.body.entry_type,
      },
    });

    if (existingEntry) {
      return res
        .status(400)
        .json({ status: "error", msg: "Data entry already exists" });
    }

    await DataEntries.create({
      user_id: req.body.user_id,
      source_id: sourceInstance.source_id,
      category_id: categoryInstance.category_id,
      entry_day: req.body.entry_day,
      entry_value: req.body.entry_value,
      entry_type: req.body.entry_type,
    });
    res.json({ status: "ok", msg: "Data entry created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error Entering Data" });
  }
};

//for adding several objects pertaining to the same day
const bulkAddEntry = async (req, res) => {
  try {
    const data = req.body;

    // Iterate over each data object in the array
    data.forEach(async (entry) => {
      const sourceInstance = await DataSources.findOne({
        where: {
          source_name: entry.source_name,
        },
        attributes: ["source_id"],
      });

      if (!sourceInstance) {
        console.log(
          `source_name ${entry.source_name} does not exist in Data_Sources table`
        );
      }

      const categoryInstance = await DataCategories.findOne({
        where: {
          category_name: entry.category_name,
        },
        attributes: ["category_id"],
      });

      if (!categoryInstance) {
        console.log(
          `category_name ${entry.category_name} does not exist in Data_Categories table`
        );
      }

      const existingEntry = await DataEntries.findOne({
        where: {
          user_id: entry.user_id,
          source_id: sourceInstance.source_id,
          category_id: categoryInstance.category_id,
          // Truncate time part for comparison
          entry_day: {
            [Sequelize.Op.eq]: Sequelize.fn("DATE", entry.entry_day),
          },
          entry_value: entry.entry_value,
          entry_type: entry.entry_type,
        },
      });

      if (existingEntry) {
        console.error("Data entry already exists:", entry);
        return; // Skip to the next iteration of the loop
      }

      // Create a new entry for each data object
      await DataEntries.create({
        user_id: entry.user_id,
        source_id: sourceInstance.source_id,
        category_id: categoryInstance.category_id,
        entry_day: entry.entry_day,
        entry_value: entry.entry_value,
        entry_type: entry.entry_type,
      });
    });

    res.json({
      status: "ok",
      msg: "Bulk data entry created. Duplicates skipped",
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error Entering Data" });
  }
};

module.exports = { addEntry, bulkAddEntry };
