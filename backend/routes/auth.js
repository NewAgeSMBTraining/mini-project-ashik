const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  adminLogin,
  employeLogin,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/auth");

router.route("/adminRegister").post(registerAdmin);
router.route("/adminLogin").post(adminLogin);
router.route("/employeLogin").post(employeLogin);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/updatePassword/:id").put(updatePassword);

module.exports = router;
