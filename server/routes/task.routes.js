const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/task.controllers");

// Define routes
router.get("/", tasksController.getAllTasks);
router.post("/", tasksController.createTask);
router.get("/:id", tasksController.getTaskById);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

module.exports = router;

// ...MODE ONE...
// router.get("/", function (req, res) {
//   // Handle GET request to root
// });
// router.get("/:id", function (req, res) {
//   // Handle GET request for resource with ID
// });
// router.post("/", function (req, res) {
//   // Handle POST request to root
// });
// router.patch("/:id", function (req, res) {
//   // Handle PATCH request for resource with ID
// });
// router.delete("/:id", function (req, res) {
//   // Handle DELETE request for resource with ID
// });

// ...MODE TWO...
// router
//   .route("/")
//   .get((req, res) => {
//     // Handle GET request to root
//   })
//   .post((req, res) => {
//     // Handle POST request to root
//   });

// router
//   .route("/:id")
//   .get((req, res) => {
//     // Handle GET request for resource with ID
//   })
//   .patch((req, res) => {
//     // Handle PATCH request for resource with ID
//   })
//   .delete((req, res) => {
//     // Handle DELETE request for resource with ID
//   });

// // Export the router
// module.exports = router;
