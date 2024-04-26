const { Sequelize, DataTypes } = require("sequelize");
const { Users } = require("./Users");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
  },
});

// Define the InsightsReports model
const InsightsReports = sequelize.define(
  "insights_reports",
  {
    report_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    report_name: DataTypes.STRING(50),
    report_type: DataTypes.STRING(50),
    analysis_results: DataTypes.STRING(100),
    date_created: DataTypes.DATE,
  },
  {
    tableName: "insights_reports", // Specify the table name
  }
);

InsightsReports.belongsTo(Users); // Define association

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Model InsightsReports synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing InsightsReports model:", err);
  });

module.exports = { InsightsReports };
