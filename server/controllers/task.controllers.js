const tasksService = require("../services/task.services");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await tasksService.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await tasksService.createTask({ title, description });
    res.status(201).json(newTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await tasksService.getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedTask = await tasksService.updateTask(id, {
      title,
      description,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await tasksService.deleteTask(id);
    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
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
