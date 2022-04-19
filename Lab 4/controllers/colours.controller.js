exports.findAll = (req, res) => {
  const data = require("../data/data.json");
  res.send(data);
};
