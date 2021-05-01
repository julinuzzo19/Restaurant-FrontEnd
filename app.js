const express = require("express");
const app = express();
const path = require("path");
const port = 5500;

app.use(express.json());

app.use(express.static("public"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
