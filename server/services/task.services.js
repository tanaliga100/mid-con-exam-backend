// src/modules/tasks/tasks.service.js
const { promisePool } = require("../config/db");

const getAllTasks = async () => {
  const [rows] = await promisePool.query("SELECT * FROM tasks");
  return rows;
};

const createTask = async ({ title, description }) => {
  const [result] = await promisePool.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description]
  );
  return {
    id: result.insertId,
    title,
    description,
  };
};

const getTaskById = async (id) => {
  const [rows] = await promisePool.query("SELECT * FROM tasks WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

const updateTask = async (id, { title, description }) => {
  const [result] = await promisePool.query(
    "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
    [title, description, id]
  );
  if (result.affectedRows === 0) return null; // Task not found
  return { id, title, description };
};

const deleteTask = async (id) => {
  const [result] = await promisePool.query("DELETE FROM tasks WHERE id = ?", [
    id,
  ]);
  return result.affectedRows > 0; // Return true if task is deleted
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
