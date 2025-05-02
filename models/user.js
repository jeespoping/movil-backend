const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: String,
    role: String,
    active: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
