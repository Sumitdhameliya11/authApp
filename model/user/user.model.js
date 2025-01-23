const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
    otp: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
