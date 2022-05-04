module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.put("/", users.update);

  router.post("/login", users.login);

  router.post("/", users.create);

  router.post("/avatar", users.avatar);

  router.get("/getUser", users.findOne);

  app.use("/users", router);
};
