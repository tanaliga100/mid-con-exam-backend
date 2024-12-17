// IMPORTS
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
const app = express();

// TOP MIDDLEWARES
app.use(express.json());
app.use(express.static("./public"));

// ROUTES
app.get("/", (req, res) => {
  res.send("Node_Express Server Alive 🛩️");
});

app.use("/api/v1/auth", () => {});
app.use("/api/v1/users", () => {});

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
    await function () {};
    app.listen(port, () => {
      console.log(`Server started at ${port} and connected to DB !!`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
console.log(process.env.NODE_ENV);
