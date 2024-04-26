const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
  },
});

// Define the DataCategory model
const DataCategories = sequelize.define(
  "data_categories",
  {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category_name: DataTypes.STRING(50),
  },
  {
    tableName: "data_categories", // Specify the table name
  }
);

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Model DataCategories synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing DataCategories model:", err);
  });

module.exports = { DataCategories };
