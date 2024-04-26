const { Sequelize, DataTypes } = require("sequelize");
const { DataCategories } = require("./DataCategories");
const { DataSources } = require("./DataSources");
const { Users } = require("./Users");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
  },
});

// Define the DataEntry model
const DataEntries = sequelize.define(
  "data_entries",
  {
    entry_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    data_timestamp: DataTypes.DATE,
    data_value: DataTypes.JSONB,
    analysis_type: DataTypes.STRING(50),
  },
  {
    tableName: "data_entries", // Specify the table name
  }
);

DataEntries.belongsTo(Users); // Define association
DataEntries.belongsTo(DataSources); // Define association
DataEntries.belongsTo(DataCategories); // Define association

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Model DataEntries synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing DataEntries model:", err);
  });

module.exports = { DataEntries };
