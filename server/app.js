// IMPORTS
const dotenv = require("dotenv");
const express = require("express");
const promisePool = require("./config/db");
const { createTable, seedDatabase } = require("./config/seed");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const exceptionMiddleware = require("./middlewares/exception.middleware");
dotenv.config();
const app = express();

// TOP MIDDLEWARES
app.use(express.json());
app.use(express.static("./public"));

// ROUTES
app.get("/", (req, res) => {
  res.send(`
    <h1>
    Node_Express Server Alive 🛩️
    </h1>
    <a href="/api/v1/tasks">Task API</a>
    `);
});

// BOTTOM MIDDLEWARES
app.use(notFoundMiddleware);
// app.use((err, req, res, next) => {
//   let customError = {
//     statusCode: err.statusCode || 500,
//     msg: err.message || "Something went wrong",
//   };
//   // MASSAGE ERROR HERE...

//   res.status(customError.statusCode).json({
//     ERROR: customError.msg,
//   });
// });
app.use(exceptionMiddleware);

// SERVER INSTANCE
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // CONNECTION TO DATABSE AND SEEDER FN here...
    await promisePool.getConnection();
    await createTable().then(() => {
      seedDatabase();
    });
    app.listen(port, () => {
      console.log(`Server started at ${port} and connected to Mysql !!!`);
    });
  } catch (error) {
    console.log("CONFIG_ERROR", error);
  }
};
start();
console.log(process.env.NODE_ENV);
