const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    // Validate request
    if (!req.body.username || !req.body.password) {
      res.status(400).json("Username/password/email can not be empty!");
      return;
    }

    const username = req.body.username;
    const password = req.body.password;

    console.log("Received: " + username, password);

    // validating username not taken
    const usernameTaken = await User.findOne({ username: username });
    if (usernameTaken) {
      return res.status(400).json("This username is taken");
    }

    // hashing user password
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const passwordHash = await bcrypt.hash(password, salt);

    // creating new user
    const newUser = new User({ username, passwordHash });

    // saving user
    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(400).json("User could not be saved");
    } else {
      console.log("User added");
    }

    req.session.userID = savedUser._id;
    req.session.user = savedUser;

    res.json("success");
  } catch (err) {
    console.log("Signup failed");
    console.log(err);
    res.status(500).send();
  }
};

// stores base64 user avatar in database
exports.avatar = async (req, res) => {
  try {
    // get image and create buffer
    let imageBase64 = req.body.avatar;
    imageBase64 = imageBase64.split(",")[1];
    let avatarImg = Buffer.from(imageBase64, "base64");

    // get user ID from token
    const token = req.cookies.token;
    if (!token) return res.json("no cookie");

    let id = getIdFromToken(token);

    await User.findByIdAndUpdate(id, { avatar: avatarImg });

    res.json("Image stored");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};

// Find a single user with an id
exports.findOne = (req, res) => {
  // get user ID from token
  const user = req.session.user;
  console.log(user);

  let id = user.id;

  User.findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Update a user by the id in the request
exports.update = (req, res) => {
  // get user ID from token
  const user = req.session.user;
  console.log(user);

  let id = user.id;

  User.findById(id)
    .then((user) => {
      user.firstname = req.body.firstname;
      user.surname = req.body.surname;
      user.dob = req.body.dob;
      user.country = req.body.country;
      user.city = req.body.city;
      user.gender = req.body.gender;
      user.address = req.body.address;
      user.profession = req.body.profession;
      user.civil = req.body.civil;
      user.salary = req.body.salary;
      user.hobbies = req.body.hobbies;
      user.sport = req.body.sport;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// user login
exports.login = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.password) {
      res.status(400).json("Invalid username/password");
      return;
    }

    const username = req.body.username;
    const password = req.body.password;

    // validating user exists
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      res.status(401).json("Username taken");
      return;
    }

    // validate user password
    const passwordValidate = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    // if not correct password
    if (!passwordValidate) {
      res.status(401).json("Invalid username/password");
      return;
    }

    req.session.userID = existingUser._id;
    req.session.user = existingUser;

    res.json("success");
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
// user logout
exports.logout = async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  }
  res.redirect("/");
};
