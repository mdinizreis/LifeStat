const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize with your PostgreSQL connection string
const sequelize = new Sequelize(process.env.DATABASE, {
  define: {
    underscored: true,
    timestamps: false, //so it does not automatically creates the columns created_at and updated_at
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
    user_username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    user_email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_hash: {
      type: DataTypes.STRING(64), // All the way to allow SHA-256 hash (64 characters)
      allowNull: false,
    },
    user_role: {
      type: DataTypes.STRING(20),
      defaultValue: "user", // Default value is "user"
    },

    user_join_date: DataTypes.DATE,
    user_last_login: DataTypes.DATE,
  },
  {
    tableName: "users", // Specify the table name
    hooks: {
      beforeCreate: (user, options) => {
        user.user_join_date = new Date(); // Set user_join_date to current date
      },
    },
  }
);

module.exports = { Users };
