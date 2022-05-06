module.exports = (app) => {
  var router = require("express").Router();

  router.get("/home", function (req, res) {
    if (req.session.user) {
      return res.render("UserPage.html", { name: req.session.user.username });
    }
    res.redirect("/");
  });

  // static routes
  router.get("/", (req, res) => {
    if (req.session.user) {
      return res.redirect("/home");
    }
    res.render("index.html");
  });

  // static routes
  router.get("/register", (req, res) => {
    if (req.session.user) {
      return res.redirect("/home");
    }
    res.render("register.html");
  });

  router.get("*", function (req, res) {
    res.status(404).render("404.html");
  });

  app.use("/", router);
};
