const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/config");
const db = require("./config/db.config");
const userRoutes = require("./routes/user/user.routes");
app.use(express.json());
app.use(cors());

//database connection
db.dbConnection();

//main routes
app.use("/api/user", userRoutes);

//testing routes
app.get("/", (req, res) => {
  res.send("server is running...!");
});

app.listen(config.port, () => {
  console.log(`server is running on http://localhost:${config.port}/`);
});
