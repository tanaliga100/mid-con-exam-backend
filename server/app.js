// IMPORTS
const dotenv = require("dotenv");
const express = require("express");
const promisePool = require("./config/db");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const exceptionMiddleware = require("./middlewares/exception.middleware");
dotenv.config();
const app = express();
const { createTable, seedDatabase, deleteAllTasks } = require("./config/seed");
const taskRoutes = require("./routes/task.routes");

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

app.use("/api/v1/tasks", taskRoutes);

// BOTTOM MIDDLEWARES
app.use(notFoundMiddleware);
app.use(exceptionMiddleware);

// SERVER INSTANCE
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // CONNECTION TO DATABSE AND SEEDER FN here...
    await promisePool.getConnection();

    // UNCOMMNET the codes below IF for FIRST time run..
    // await deleteAllTasks();
    // await createTable().then(() => {
    //   seedDatabase();
    // });
    app.listen(port, () => {
      console.log(`Server started at ${port} and connected to Mysql !!!`);
    });
  } catch (error) {
    console.log("CONFIG_ERROR", error);
  }
};
start();

console.log(process.env.NODE_ENV);
