const express = require("express");
const router = express.Router();

const { authenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  getEmployees,
  getAnEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getAllLeaves,
  getALeave,
  blockEmployee,
  approveLeave,
  rejectLeave,
} = require("../controllers/admin");

router.route("/allEmployees").get(getEmployees);
router.route("/getAnEmployee/:id").get(getAnEmployee);
router.route("/createUser").post(createEmployee);
router.route("/deleteUser/:id").delete(deleteEmployee);
router.route("/updateUser/:id").put(updateEmployee);
router.route("/allLeaves").get(getAllLeaves);
router.route("/getLeave/:id").get(getALeave);
router.route("/blockEmployee/:id").post(blockEmployee);
router.route("/approveLeave/:id").post(approveLeave);
router.route("/rejectLeave/:id").post(rejectLeave);

module.exports = router;
