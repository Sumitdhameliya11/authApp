const mongoose = require("mongoose");
const config = require("./config");

const dbConnection = () => {
  mongoose
    .connect(config.mongo_url)
    .then(() => {
      console.log("database connection successfully");
    })
    .catch(() => {
      console.log("database connection failed");
    });
};

module.exports = {
  dbConnection,
};
