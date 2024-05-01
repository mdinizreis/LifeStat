const { DataCategories } = require("../models/DataCategories");

const seedCategories = async (req, res) => {
  try {
    // Delete all existing records from the users table
    await DataCategories.destroy({ where: {} });

    // Seed the database with new categories records
    await DataCategories.bulkCreate([
      {
        category_name: "deep_sleep_duration",
      },
      {
        category_name: "light_sleep_duration",
      },
      {
        category_name: "rem_sleep_duration",
      },
      {
        category_name: "total_sleep_duration",
      },
      {
        category_name: "time_in_bed",
      },
      {
        category_name: "average_heart_rate",
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

module.exports = { seedCategories };
