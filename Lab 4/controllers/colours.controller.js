exports.findAll = (req, res) => {
  const data = require("../data/data.json");
  res.send(data);
};

exports.findOne = (req, res) => {
  const data = require("../data/data.json");
  let id = req.params.id;

  res.send(data[id]);
};

exports.create = (req, res) => {
  const data = require("../data/data.json");
  console.log(req.body);

  res.send(data);
};
