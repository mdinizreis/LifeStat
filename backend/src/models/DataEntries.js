const { Sequelize, DataTypes } = require("sequelize");
const { DataCategories } = require("./DataCategories");
const { DataSources } = require("./DataSources");
const { Users } = require("./Users");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
    timestamps: false, //so it does not automatically creates the columns created_at and updated_at
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
    entry_day: DataTypes.DATE,
    entry_value: DataTypes.NUMERIC, //need to research further on how to use JSONB for this instead
    entry_type: DataTypes.STRING(50),
  },
  {
    tableName: "data_entries", // Specify the table name
  }
);

DataEntries.belongsTo(Users, { foreignKey: "user_id" }); // Define association
DataEntries.belongsTo(DataSources, { foreignKey: "source_id" }); // Define association
DataEntries.belongsTo(DataCategories, { foreignKey: "category_id" }); // Define association

module.exports = { DataEntries };
