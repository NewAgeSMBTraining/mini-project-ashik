const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
ObjectId = require("mongodb").ObjectID;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter your E-mail ID"],
    validator: [validator.isEmail, "Enter a valid E-mail ID"],
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please Enter your password"],
    minlength: [3, "Password needs a minimum charcter length of 3"],
  },
  role: {
    type: String,
    default: "admin",
  },

  createdAt: {
    type: String,
    default: new Date(new Date()),
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// password compairing
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Creating jwt for user
userSchema.methods.getJwtToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Password Reset Token
userSchema.methods.getPasswordResetToken = function () {
  // Token Genaration
  const resetToken = crypto.randomBytes(20).toString("hex"); // crypto generate random bytes

  // this.resetPasswordToken = crypto
  //   .createHash("sha256")
  //   .update(resetToken)
  //   .digest("hex");

  this.resetPasswordToken = bcrypt.hash(resetToken, 10).toString();

  // setting token expiry
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);


