const { Sequelize, DataTypes } = require("sequelize");
const { Users } = require("./Users");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
    timestamps: false, //so it does not automatically creates the columns created_at and updated_at
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
    hooks: {
      beforeCreate: (insightsReport, options) => {
        insightsReport.date_created = new Date(); // Set date_created to current date
      },
    },
  }
);

InsightsReports.belongsTo(Users); // Define association

module.exports = { InsightsReports };
