// IMPORTS
const dotenv = require("dotenv");
const express = require("express");
const promisePool = require("./config/db");
dotenv.config();
const app = express();

// TOP MIDDLEWARES
app.use(express.json());
app.use(express.static("./public"));

// ROUTES
app.get("/", (req, res) => {
  res.send("Node_Express Server Alive 🛩️");
});

// BOTTOM MIDDLEWARES
app.use((req, res, next) => {
  res.status(404).send(
    `<h3>Route Does not Exist</h3>
  <a href="/">Go Back</a>`
  );
});
app.use((err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong",
  };
  // MASSAGE ERROR HERE...

  res.status(customError.statusCode).json({
    ERROR: customError.msg,
  });
});

// SERVER INSTANCE
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // SEEDER

    // await promisePool.getConnection();
    app.listen(port, () => {
      console.log(`Server started at ${port} and connected to Mysql !!!`);
    });
  } catch (error) {
    console.log("CONFIG_ERROR", error);
  }
};
start();
console.log(process.env.NODE_ENV);
