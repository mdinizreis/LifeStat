const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
    timestamps: false, //so it does not automatically creates the columns created_at and updated_at
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

module.exports = { DataSources };
