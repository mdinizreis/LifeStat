const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
  },
});

// Define the DataSource model
const DataSources = sequelize.define(
  "data_sources",
  {
    source_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    source_name: DataTypes.STRING(50),
    source_type: DataTypes.STRING(50),
    api_key_access_token: DataTypes.STRING(100),
    user_permissions: DataTypes.STRING(100),
  },
  {
    tableName: "data_sources", // Specify the table name
  }
);

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Model DataSources synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing DataSources model:", err);
  });

module.exports = { DataSources };
