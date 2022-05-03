const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const publicDirPath = path.join(__dirname, "/public");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(publicDirPath, "/index.html"));
});
app.use("*", function (req, res) {
  res.status(404).sendFile(publicDirPath + "/404.html");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
