const express = require("express");
const path = require("path");
const app = express();
const publicDirPath = path.join(__dirname, "/public");
const redis = require("redis");
const connect = require("connect-redis");
const session = require("express-session");

const store = connect(session);

const redisClient = redis.createClient({
  port: 6379,
  host: "localhost",
  legacyMode: true,
});

(async () => {
  await redisClient.connect();
})();

redisClient.on("error", function (error) {
  console.log(error);
});
redisClient.on("connect", function (error) {
  console.log("Connected to Redis!");
});

app.use(
  session({
    store: new store({ client: redisClient }),
    secret: "enterprise",
    saveUninitialized: false,
    resave: false,
    name: "session",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 120, // 2 hour session
    },
  })
);

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

app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "/views"));
app.engine("html", require("ejs").renderFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/user.routes")(app);
require("./routes/page.routes")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
