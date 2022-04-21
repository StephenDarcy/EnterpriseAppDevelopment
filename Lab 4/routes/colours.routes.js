module.exports = (app) => {
  const colours = require("../controllers/colours.controller.js");
  var router = require("express").Router();

  router.get("/colours", colours.findAll);

  router.get("/colours/:id", colours.findOne);

  app.use("/", router);
};
