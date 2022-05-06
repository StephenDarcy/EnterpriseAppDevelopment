module.exports = (mongoose) => {
  var schema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
      },
      passwordHash: {
        type: String,
        required: "Password is required",
        trim: true,
      },
      firstname: {
        type: String,
        default: "Firstname",
      },
      surname: {
        type: String,
        default: "Surname",
      },
      avatar: Buffer,
      dob: {
        type: String,
        default: "Date of Birth",
      },
      email: {
        type: String,
        default: "Email",
      },
      address: {
        type: String,
        default: "Address",
      },
      gender: {
        type: String,
        default: "Male/Female",
      },
      city: {
        type: String,
        default: "Dublin",
      },
      hobbies: {
        type: String,
        default: "Football",
      },
      civil: {
        type: String,
        default: "Single",
      },
      profession: {
        type: String,
        default: "Web Developer",
      },
      salary: {
        type: String,
        default: "$100,000",
      },
      sport: {
        type: String,
        default: "Hockey",
      },
      country: {
        type: String,
        default: "Ireland",
      },
    },
    {
      timestamps: true,
    }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const User = mongoose.model("User", schema);
  return User;
};
