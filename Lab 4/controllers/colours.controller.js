const fs = require("fs");
const fileName = "../data/data.json";
var path = require("path");

exports.background = (req, res) => {
  let hexValue = req.params.hex;
  res.cookie("colour", hexValue).send("cookie set");
};

exports.findAll = (req, res) => {
  const data = require(fileName);
  res.send(data);
};

exports.findOne = (req, res) => {
  const data = require(fileName);
  let id = req.params.id;

  let desiredColour = data.filter((obj) => obj.colorId == parseInt(id));
  res.cookie("current", desiredColour[0].colorId).send(desiredColour[0]);
};

exports.updateOne = (req, res) => {
  const data = require(fileName);
  let id = req.params.id;

  let newColour = req.body;
  let rgb = newColour.rgb.replace(/[^\d,]/g, "").split(",");
  let hsl = newColour.hsl.replace(/[^\d,]/g, "").split(",");

  data.forEach((element) => {
    if (element.colorId == parseInt(id)) {
      element.hexString = newColour.hex;
      element.rgb = {
        r: parseInt(rgb[0]),
        g: parseInt(rgb[1]),
        b: parseInt(rgb[2]),
      };
      element.hsl = {
        h: parseInt(hsl[0]),
        s: parseInt(hsl[1]),
        l: parseInt(hsl[2]),
      };
      element.name = newColour.name;
    }
  });

  fs.writeFile(
    path.join(__dirname, fileName),
    JSON.stringify(data, null, 2),
    function writeJSON(err) {
      if (err) return console.log(err);
    }
  );

  res.send({ message: "http://localhost:8080/colours/" + id });
};

exports.deleteOne = (req, res) => {
  const data = require(fileName);
  let id = req.params.id;

  let filteredData = data.filter((obj) => obj.colorId !== parseInt(id));
  fs.writeFile(
    path.join(__dirname, fileName),
    JSON.stringify(filteredData, null, 2),
    function writeJSON(err) {
      if (err) return console.log(err);
    }
  );
  res.send("Colour deleted");
};

exports.create = (req, res) => {
  const data = require(fileName);
  let newColour = req.body;

  // set ID of new colour +1 from last
  let currentId = data[data.length - 1].colorId + 1;
  let rgb = newColour.rgb.replace(/[^\d,]/g, "").split(",");
  let hsl = newColour.hsl.replace(/[^\d,]/g, "").split(",");

  // create object in the correct format
  let newColourObj = {
    colorId: currentId,
    hexString: newColour.hex,
    rgb: {
      r: parseInt(rgb[0]),
      g: parseInt(rgb[1]),
      b: parseInt(rgb[2]),
    },
    hsl: { h: parseInt(hsl[0]), s: parseInt(hsl[1]), l: parseInt(hsl[2]) },
    name: newColour.name,
  };
  try {
    data.push(newColourObj);
    fs.writeFile(
      path.join(__dirname, fileName),
      JSON.stringify(data, null, 2),
      function writeJSON(err) {
        if (err) return console.log(err);
      }
    );
    res.send({ message: "http://localhost:8080/colours/" + currentId });
  } catch (error) {
    console.log(error);
    res.send("New colour could not be added");
  }
};
