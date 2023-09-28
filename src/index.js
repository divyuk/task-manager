const express = require("express");
const taskDB = require("../tasks.json");

const app = express();
const PORT = 3000;

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

app.post("/tasks", (req, res) => {});

app.listen(PORT, (error) => {
  if (error) console.log("Something went wrong...");
  else console.log("Server started on the port 3000");
});
