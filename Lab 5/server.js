const express = require("express");
const path = require("path");
const app = express();
const publicDirPath = path.join(__dirname, "/public");

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/user.routes")(app);

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
