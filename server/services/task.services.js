const promisePool = require("../config/db");

const getAllTasks = async () => {
  const query = `SELECT * FROM tasks;`;
  const [rows] = await promisePool.query(query);
  return rows;
};

const createTask = async ({ title, description, status }) => {
  const [result] = await promisePool.query(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [title, description, status]
  );
  return {
    id: result.insertId,
    title,
    description,
    status,
  };
};

const getTaskById = async (id) => {
  const query = `SELECT * FROM tasks WHERE id = ?;`;
  const [rows] = await promisePool.query(query, [id]);
  return rows[0];
};

const updateTask = async (id, { title, description, status }) => {
  const query = `UPDATE tasks SET title = ?, description = ? , status = ? WHERE id = ?;`;
  const [result] = await promisePool.query(query, [
    title,
    description,
    status,
    id,
  ]);
  if (result.affectedRows === 0) return null; // Task not found
  return { id, title, description, status };
};

const deleteTask = async (id) => {
  const query = `DELETE FROM tasks WHERE id = ?;`;
  const [result] = await promisePool.query(query, [id]);
  return result.affectedRows > 0; // Return true if task is deleted
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
