const { NotFound, BadRequest } = require("../classes/error.classes");
const tasksService = require("../services/task.services");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();
    if (tasks.length === 0) {
      // utilize the class error for better error handling...
      return next(new NotFound("No recods on the database"));
    }
    res.status(200).json({
      msg: "ALL TASKS",
      counts: tasks.length,
      tasks,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};

const createTask = async (req, res, next) => {
  const { title, description, status = "pending" } = req.body;
  try {
    if (!title || !description) {
      return next(new BadRequest("All fields are required"));
    }
    const newTask = await tasksService.createTask({ ...req.body });
    console.log("new tasks", req.body);

    res.status(201).json({
      msg: "TASK CREATED ",
      newTask,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
};

const getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await tasksService.getTaskById(id);
    if (!task) {
      return next(new NotFound(`No task with id : ${id}`));
      // return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      msg: "SINGLE TASK",
      task,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await tasksService.updateTask(id, {
      title,
      description,
      status,
    });
    if (!updatedTask) {
      return next(new NotFound(`No task with id : ${id}`));
      // return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      msg: "TASK UPDATED",
      updatedTask,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await tasksService.deleteTask(id);
    if (!result) {
      return next(new NotFound(`No task with id : ${id}`));
      // return res.status(404).json({ message: "Task not found" });
    }
    res.status(202).json({
      msg: "TASK DELETED",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
