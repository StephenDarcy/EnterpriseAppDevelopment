module.exports = (app) => {
  const colours = require("../controllers/colours.controller.js");
  var router = require("express").Router();

  router.get("/colours", colours.findAll);

  router.get("/colours/:id", colours.findOne);

  router.put("/colours/:id", colours.updateOne);

  router.post("/colours", colours.create);

  router.delete("/colours/:id", colours.deleteOne);

  router.get("/background/:hex", colours.background);

  app.use("/", router);
};
