const { Sequelize } = require("sequelize");
const { Users } = require("../models/Users");
const { InsightsReports } = require("../models/InsightsReports");
const { DataSources } = require("../models/DataSources");
const { DataEntries } = require("../models/DataEntries");
const { DataCategories } = require("../models/DataCategories");

const connectDB = async () => {
  try {
    const sequelize = new Sequelize(process.env.DATABASE, {
      logging: false, // Set to true to log SQL queries
    });

    await sequelize.authenticate();
    console.log("Database connected successfully");

    // synchronize all models - need to sync in order, depending on tables relationships (tables with FK need to be imported after the tables they relate to)
    await Users.sync();
    await DataCategories.sync();
    await DataSources.sync();
    await InsightsReports.sync();
    await DataEntries.sync();

    console.log("Models synchonized successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
