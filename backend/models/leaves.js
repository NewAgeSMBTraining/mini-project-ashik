const mongoose = require("mongoose");
const validator = require("validator");

const leavesSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  applyDate: {
    type: String,
    default: new Date().toLocaleString("en-US"),
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Applied",
  },
  createdAt: {
    type: String,
    default: new Date(new Date()),
  },
});

module.exports = mongoose.model("Leaves", leavesSchema);
