require("dotenv").config();

const port = process.env.PORT;
const mongo_url = process.env.MONGODB_URL;
const jwtKey = process.env.JWT_KEY;
const emailUserName = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;
module.exports = {
  port,
  mongo_url,
  jwtKey,
  emailPassword,
  emailUserName,
};
