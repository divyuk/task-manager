const express = require("express");
const taskDB = require("./tasks.json");
const validator = require("./helpers/validator");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Use cors middleware to enable cross-origin requests

app.get("/", (req, res) => {
  res.status(200).send("This is the homepage...");
});

app.get("/tasks", (req, res) => {
  try {
    let filteredTasks = [...taskDB];

    // Filter tasks based on completion status
    if (req.query.flag) {
      filteredTasks = filteredTasks.filter(
        (task) => task.flag === req.query.flag
      );
    }

    // Sort tasks by creation date (timestamp)
    if (req.query.sort === "asc") {
      filteredTasks.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    } else if (req.query.sort === "desc") {
      filteredTasks.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    }

    res.status(200).json(filteredTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/tasks/:id", (req, res) => {
  const userProvidedID = req.params.id;
  const singleTask = taskDB.filter((obj) => obj.id == userProvidedID);
  res.status(200).send(singleTask);
});

app.get("/tasks/priority/:level", (req, res) => {
  const level = req.params.level;
  let filterTasks = [...taskDB];
  filterTasks = filterTasks.filter((task) => task.priority == level);
  res.status(200).send(filterTasks);
});

app.post("/tasks", (req, res) => {
  const userPostedTask = req.body;
  const currentTime = new Date().toISOString();
  userPostedTask.timestamp = currentTime;
  userPostedTask.id = uuidv4();
  if (validator.validation(userPostedTask).status) {
    taskDB.push(userPostedTask);
    const jsonData = JSON.stringify(taskDB);
    const writePath = path.join(__dirname, "tasks.json");
    fs.writeFile(writePath, jsonData, (err) => {
      if (err) res.status(500).send("Something went wrong!!");
      else res.status(201).send(validator.validation(userPostedTask).data);
    });
  } else res.status(400).send(validator.validation(userPostedTask).message);
});

app.put("/tasks/:id", (req, res) => {
  const ID = req.params.id;
  const updatedBody = req.body;
  const updatedTask = taskDB.map((task) => {
    if (task.id == ID) return { ...task, ...updatedBody };
    else return task;
  });
  const jsonData = JSON.stringify(updatedTask);
  const writePath = path.join(__dirname, "tasks.json");
  fs.writeFile(writePath, jsonData, (err) => {
    if (err) res.status(500).send("Something went wrong!!");
    else res.status(201).send("Task Updated");
  });
});

app.delete("/tasks/:id", (req, res) => {
  const ID = req.params.id;
  const filtredTask = taskDB.filter((task) => task.id != ID);
  const jsonData = JSON.stringify(filtredTask);
  const writePath = path.join(__dirname, "tasks.json");
  fs.writeFile(writePath, jsonData, (err) => {
    if (err) res.status(500).send("Something went wrong!!");
    else res.status(204).send("Task Updated");
  });
});

app.listen(PORT, (error) => {
  if (error) console.log("Something went wrong...");
  else console.log("Server started on the port 3000");
});
