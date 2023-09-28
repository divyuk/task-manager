const express = require("express");
const taskDB = require("./tasks.json");
const validator = require("./helpers/validator");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("This is the homepage...");
});

app.get("/tasks", (req, res) => {
  res.status(200).send(taskDB);
});

app.get("/tasks/:id", (req, res) => {
  const userProvidedID = req.params.id;
  const singleTask = taskDB.filter((obj) => obj.id == userProvidedID);
  res.status(200).send(singleTask);
});

app.post("/tasks", (req, res) => {
  const userPostedTask = req.body;
  if (validator.validation(userPostedTask)) {
    taskDB.push(userPostedTask);
    const jsonData = JSON.stringify(taskDB);
    const writePath = path.join(__dirname, "tasks.json");
    fs.writeFile(writePath, jsonData, (err) => {
      if (err) res.status(500).send("Something went wrong!!");
      else res.status(201).send(validator.validation(userPostedTask).message);
    });
  } else res.status(400).send(validator.validation(userPostedTask).message);
});

app.listen(PORT, (error) => {
  if (error) console.log("Something went wrong...");
  else console.log("Server started on the port 3000");
});
