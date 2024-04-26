require("dotenv").config();

const express = require("express");
const connectDB = require("./src/db/db");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const users = require("./src/routers/users");
const insightsReports = require("./src/routers/insightsReports");
const dataSources = require("./src/routers/dataSources");
const dataEntries = require("./src/routers/dataEntries");
const dataCategories = require("./src/routers/dataCategories");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", users);
app.use("/", insightsReports);
app.use("/", dataSources);
app.use("/", dataEntries);
app.use("/", dataCategories);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
