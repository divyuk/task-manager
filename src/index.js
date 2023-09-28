const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) console.log("Something went wrong...");
  else console.log("Server started on the port 3000");
});
