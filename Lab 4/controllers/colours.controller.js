exports.findAll = (req, res) => {
  const data = require("../data/data.json");
  res.send(data);
};

exports.findOne = (req, res) => {
  const data = require("../data/data.json");
  let id = req.params.id;

  res.send(data[id]);
};
