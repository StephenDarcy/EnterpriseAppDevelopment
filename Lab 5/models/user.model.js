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
      avatar: Buffer,
      DOB: String,
      email: String,
      address: String,
      gender: String,
      city: String,
      hobbies: String,
      civil: String,
      profession: String,
      salary: String,
      sport: String,
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
