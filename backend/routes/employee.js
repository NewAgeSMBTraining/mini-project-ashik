const express = require("express");
const router = express.Router();
const { authenticatedUser } = require("../middleware/auth");

const {
  createLeave,
  getMyDetails,
  updateEmployee,
  getLeaves,
} = require("../controllers/employee");

router.route("/createLeave/:id").post(createLeave);
router.route("/myDetails/:id").get(getMyDetails);
router.route("/updateEmployee/:id").put(updateEmployee);
router.route("/getLeaves/:userId").get(getLeaves);

module.exports = router;
