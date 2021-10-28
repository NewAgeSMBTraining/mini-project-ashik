const User = require("../models/user");
const Employee = require("../models/employee");
const Leaves = require("../models/leaves");
const catchAsyncError = require("../middleware/catchAsyncError");
const bcrypt = require('bcryptjs');
var moment = require('moment');



// Get all employee
exports.getEmployees = catchAsyncError (async (req, res) => {

    const users = await Employee.find();

    return res.status(200).json({
      success: true,
      users,
    });
});


// Get single employee
exports.getAnEmployee = catchAsyncError (async (req, res) => {

  const user = await Employee.findById(req.params.id);

  if(!user) {
      return res.status(401).json({message:"No user found"})
  };

    return res.status(200).json({
      success: true,
      user,
    });

});


// Add new user
exports.createEmployee = catchAsyncError (async (req, res) => {

    const {
      name,
      email,
      dob,
      gender,
      contact,
      address,
      qualification,
      experience,
      password = await bcrypt.hash(password, 10) ,
    } = req.body;


    const newUser = await Employee.create({
        name,
        dob,
        gender,
        contact,
        address,
        qualification,
        experience,
        email,
        password,
    });

    if (
        !name ||
        !email ||
        !dob ||
        !gender ||
        !contact ||
        !address ||
        !qualification ||
        !experience ||
        !password
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    

    // DO : CHECK FOR SAME USER

    return res.status(200).json({
      success: true,
      newUser,
    });

});


// Delete a user
exports.deleteEmployee = catchAsyncError (async (req, res) => {

        const user = await Employee.findById(req.params.id);

        if(!user) {
            return res.status(401).json({message:"No user found"})
        };

        await user.remove();

        return res.status(200).json({
            success: true,
        });

});


// Update a user
exports.updateEmployee = catchAsyncError (async (req, res) => {
 
        
        const updatedUser = {
            name : req.body.name,
            email : req.body.email,
            dob : req.body.dob,
            gender : req.body.gender,
            contact : req.body.contact,
            address : req.body.address,
            qualification : req.body.qualification,
            experience : req.body.experience,
            password : req.body.password,
        } 
        const user = await Employee.findByIdAndUpdate(req.params.id, updatedUser )
        
        return res.status(200).json({
            success: true,
        });
});


// Get all leaves
exports.getAllLeaves = catchAsyncError (async (req, res) => {

  const leaves = await Leaves.find();

  return res.status(200).json({
    success: true,
    leaves,
  });

});


// Get a single leaves
exports.getALeave = catchAsyncError (async (req, res) => {

  // const {userId } = req.body;
  const leave = await Leaves.find({userId : req.params.id});

  if(!leave) {
    return res.status(401).json({message:"No user found"})
};

  return res.status(200).json({
    success: true,
    leave,
  });

});


// block/Unblock employee
exports.blockEmployee = catchAsyncError (async (req, res) => {

  const user = await Employee.findById(req.params.id);

  if(!user) {
    return res.status(401).json({message:"No user found"})
};

  Employee.findByIdAndUpdate (req.params.id, { block : !user.block } ).then(
    data => {
      console.log(data)
    }
  );
  return res.status(200).json({
    success: true
  });
});


// Approve leave
exports.approveLeave = catchAsyncError (async (req, res) => {

  const user = await Leaves.findById(req.params.id);

  if(!user) {
    return res.status(401).json({message:"No user found"})
};

Leaves.findByIdAndUpdate (req.params.id, { status : "Approved" } ).then(
    data => {
      console.log(data)
    }
  );
  return res.status(200).json({
    success: true
  });
});



// Reject leave
exports.rejectLeave = catchAsyncError (async (req, res) => {

  const user = await Leaves.findById(req.params.id);

  if(!user) {
    return res.status(401).json({message:"No user found"})
};

Leaves.findByIdAndUpdate (req.params.id, { status : "Rejected" } ).then(
    data => {
      console.log(data)
    }
  );
  return res.status(200).json({
    success: true
  });
});
