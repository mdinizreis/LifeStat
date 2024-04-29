const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
    timestamps: false, //so it does not automatically creates the columns created_at and updated_at
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

module.exports = { DataCategories };
