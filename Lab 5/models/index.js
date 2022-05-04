const url = "mongodb://127.0.0.1:27017/lab5-c18490924";
const mongoose = require("mongoose");
const db = {};
db.mongoose = mongoose;
db.url = url;
db.users = require("./user.model.js")(mongoose);
module.exports = db;
