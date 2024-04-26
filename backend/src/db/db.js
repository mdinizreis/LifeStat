const { Sequelize } = require("sequelize");

const connectDB = async () => {
  try {
    const sequelize = new Sequelize(process.env.DATABASE, {
      logging: false, // Set to true to log SQL queries
    });

    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync(); // synchronize models
    console.log("Models synchonized successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
