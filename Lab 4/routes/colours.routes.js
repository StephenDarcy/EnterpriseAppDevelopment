module.exports = (app) => {
  const colours = require("../controllers/colours.controller.js");
  var router = require("express").Router();

  router.get("/colours", colours.findAll);

  app.use("/", router);
};
