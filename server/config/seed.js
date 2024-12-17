const promisePool = require("./db");

// creating table here...
exports.createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      status ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await promisePool.query(query);
  console.log("\x1b[31m%s\x1b[0m", "Tasks table created !");
};

// seeding the data
const tasks = [
  {
    title: "Create a core modules simulation",
    description: "simulate the core node modules",
    status: "pending",
  },
  {
    title: "Complete Node.js Exam",
    description: "Finish building the REST API for the task manager app",
    status: "completed",
  },
  {
    title: "Update documentation",
    description: "Add documentation for API endpoints and setup instructions",
    status: "in_progress",
  },
];
// Function to seed the data
exports.seedDatabase = async () => {
  try {
    // Insert sample data into the 'tasks' table
    for (let task of tasks) {
      const query = `
        INSERT INTO tasks (title, description, status)
        VALUES (?, ?, ?)
      `;
      await promisePool.query(query, [
        task.title,
        task.description,
        task.status,
      ]);
    }

    console.log("\x1b[33m%s\x1b[0m", "Database seeded successfully.....");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};
