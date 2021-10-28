const User = require("../models/user");
const catchAsyncErrors = require("../middleware/catchAsyncError");
// const ErrorHandler = require('../utils/errorHandler');
const jwt = require("jsonwebtoken");

// checking for autherised person to access particular routes
exports.authenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  //console.log(token)

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login Again",
    });
  }

  const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(verifiedUser.id); // we allready have the user ID in the payload
  next();
});
