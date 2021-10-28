const User = require("../models/user");
const Employee = require("../models/employee");
const Leaves = require("../models/leaves");
const catchAsyncError = require("../middleware/catchAsyncError");
const { db } = require("../models/user");
const sendToken = require("../utils/jwtToken");

// Add New leave
exports.createLeave = catchAsyncError (async (req, res) => {


    //const { userId } = req.params.id;
    const {userId, name, fromDate, toDate, reason, status } = req.body;

    const newLeave = await Leaves.create({ userId,name, fromDate, toDate, reason, status});

    if ( !userId || !name || !fromDate || !toDate || !reason  ) {
        return res.status(400) .json({ success: false, message: "All fields required" });
    };

    return res.status(200).json({ success: true,newLeave, message : "New Leave created"});

});


// Get leaves
exports.getLeaves = catchAsyncError (async (req, res) => {

    const leaves = await Leaves.find({ userId : req.params.userId });

    if(!leaves) {
        return res.status(401).json({message:"No Leaves found"})
    };

    return res.status(200).json({
    success: true,
    leaves
    });
});


// Get single employee
exports.getMyDetails = catchAsyncError (async (req, res) => {

    const user = await Employee.findById(req.params.id);

    if(!user) {
        return res.status(401).json({message:"No user found"})
    };

    return res.status(200).json({
    success: true,
    user,
    });
});


// Update Details
exports.updateEmployee = catchAsyncError (async (req, res) => {
 
    const updateEmployee = {
        name : req.body.name,
        dob : req.body.dob,
        gender : req.body.gender,
        contact : req.body.contact,
        address : req.body.address,
        qualification : req.body.qualification,
        experience : req.body.experience,
    } 
    const user = await Employee.findByIdAndUpdate(req.params.id, updateEmployee )
    
    return res.status(200).json({
        success: true,
        user
    });
});



