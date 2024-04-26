const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
  },
});

// Define the User model
const Users = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_username: DataTypes.STRING(20),
    user_email: DataTypes.TEXT,
    user_password: DataTypes.TEXT,
    user_join_date: DataTypes.DATE,
    user_last_login: DataTypes.DATE,
  },
  {
    tableName: "users", // Specify the table name
  }
);

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Model Users synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing Users model:", err);
  });

module.exports = { Users };
