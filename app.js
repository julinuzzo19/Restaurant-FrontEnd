const express = require("express");
const app = express();
const port = 5500;

app.use(express.json());

app.use(express.static("public"));

app.use('/favicon.ico', express.static('/public/assets/images/favicon.ico'));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
