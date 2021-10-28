const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the Name of employee"],
  },
  dob: {
    type: String,
    required: [true, "Please Enter the DOB of employee"],
  },
  gender: {
    type: String,
    required: [true, "Please Enter the Gender of employee"],
    enum: {
      values: ["Male", "Female", "Transgender"],
      message: "Please select correct option",
    },
  },
  contact: {
    type: Number,
    required: [true, "Please Enter the Contact of employee"],
  },
  address: {
    type: String,
    required: [true, "Please Enter the Address of employee"],
  },

  qualification: {
    type: String,
    required: [true, "Please Enter the Qualification of employee"],
    enum: {
      values: ["SSLC", "HSC", "Graduation", "Post-Graduation"],
      message: "Please select correct option",
    },
  },
  experience: {
    type: Number,
    required: [true, "Please Enter the experience of employee"],
  },
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
    default: "user",
  },
  block: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: new Date(new Date()),
  },
});

// Password hashing
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// password compairing
employeeSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Creating jwt for user
employeeSchema.methods.getJwtToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = mongoose.model("Employee", employeeSchema);
