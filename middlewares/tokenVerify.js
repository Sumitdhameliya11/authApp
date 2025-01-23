const jwt = require("jsonwebtoken");
const config = require("../../config/config");
//verify the auth token
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, config.jwtKey, (error, decoded) => {
      if (error) {
        return res.status(401).send("Provide valid token");
      } else {
        req.user = decoded; // store the user information in token
        next();
      }
    });
  } else {
    return res.status(403).send("authorized forbidden");
  }
};
module.exports = {
  verifyToken,
};
