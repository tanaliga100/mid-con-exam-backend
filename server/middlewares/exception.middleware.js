const { AppError } = require("../classes/error.classes");

const exceptionMiddleware = async (err, req, res, next) => {
  console.log(err instanceof AppError ? "CUSTOM_ERROR" : "FALLBACK_ERROR");

  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong",
  };

  // Customize the error response based on specific error namess
  if (err.name === "Sample_Error_Name") {
    customError.msg = "A specific error occurred.";
    customError.statusCode = 400; // Example status code
  }

  res.status(customError.statusCode).json({
    ERROR: customError.msg,
  });
};

module.exports = exceptionMiddleware;
