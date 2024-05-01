const { DataSources } = require("../models/DataSources");

const seedSources = async (req, res) => {
  try {
    // Delete all existing records from the users table
    await DataSources.destroy({ where: {} });

    // Seed the database with new categories records
    await DataSources.bulkCreate([
      {
        source_name: "oura",
      },
      {
        source_name: "fitbit",
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seeding error" });
  }
};

module.exports = { seedSources };
