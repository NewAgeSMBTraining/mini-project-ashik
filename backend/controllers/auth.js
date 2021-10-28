const User = require("../models/user");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const Employee = require("../models/employee");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");



// Register Admin
exports.registerAdmin = catchAsyncError (async (req, res) => {
    const {email,password} = req.body;

        const user = await User.create({
            email,
            password
        });
    
        // generate and send token
        const token = user.getJwtToken()

        res.status(200).json({
            success : true,
            token
        })
});


//Login Admin
exports.adminLogin = catchAsyncError (async (req, res) => {

    const {email,password} = req.body;

        if(!email){
            return res.status(400).json({success:false, message : "Email required"})
        };
        if(!password){
            return res.status(400).json({success:false, message : "Password Required"})
        };
        
        const user = await User.findOne({ email }).select('+password');
    
        // check email
        if(!user){
            return res.status(401).send("User not Registered")
        };
    
        // check password
        const isPasswordMatched = await user.comparePassword(password);
    
        if(!isPasswordMatched){
            return res.status(401).json({success:false, message : "Wrong Password "})
        };
    
        // generate and send token
        const token = user.getJwtToken()
        //console.log(token)
        return res.send({
            success : true,
            token : token,
            user
        })
});


//Login Employee
exports.employeLogin = catchAsyncError (async (req, res) => {


    const {email,password} = req.body;


        if(!email){
            return res.status(400).json({success:false, message : "Email required"})
        };
        if(!password){
            return res.status(400).json({success:false, message : "Password Required"})
        };
        
        const user = await Employee.findOne({ email }).select('+password');
    
        // check email
        if(!user){
            return res.status(401).send("User not Registered")
        };

        if(user.block==true){
            return res.status(401).json({message:"User BLocked"})
        };
    
        // check password
        const isPasswordMatched = await user.comparePassword(password);
    
        if(!isPasswordMatched){
            return res.status(401).json({success:false, message : "Wrong Password "})
        };
    
        // generate and send token
        const token = user.getJwtToken()

        res.status(200).json({
            success : true,
            token,
            user
        })
});

// Forgot password
exports.forgotPassword = catchAsyncError(async (req,res,next) => {

    // check for the email user providing
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return res.status(400).json({success:false, message : "User not found"})
    };

    // Genarating the Password Reset token
    const resetToken = user.getPasswordResetToken();
    await user.save( {validateBeforeSave: false} );

    // Create password reset URL
    // const passwordResetUrl = ${req.protocol}://${req.get('host')}/#/password/reset/${resetPasswordToken};
    const passwordResetUrl = `${'http://localhost:3000'}/#/password/reset/${resetToken}`;

    // Sending message 
    const message =` Your password Reset Token is as follows: ${passwordResetUrl}`;
    
    // Sending EMail to user 
    try {
        await sendEmail({
            email : user.email,
            subject : 'EMS Password Recovery Email',
            message
            
        })
        res.status(200).json({
            success : true,
            message : 'Password Recovery Email sent. Please check the Email',
            resetToken
        })
        
    } catch (error) {

        user.resetPasswordToken  = undefined;
        user.resetPasswordExpire  = undefined;

        await user.save( {validateBeforeSave: false} );
        
        return res.status(400).json({success:false, message : "Some error occured"})
        
    }

});

// RESET USER PASSWORD
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // Hashing the token in URL
    //const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const resetPasswordToken = bcrypt.hash(req.params.token, 10).toString();


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    //console.log(user)

    if (!user) {
        return res.status(400).json({
            success:false, 
            message : "Password reset token is invalid or has been expired"
        })
    }
    
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            success:false, 
            message : "Password does not match"
        })
    }

    // set the new password & save
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
});


// Update Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {

        if(req.body.role == 'user'){

        const user = await Employee.findById(req.params.id).select('+password');
        //checking the old password
        // const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
        // if (!isPasswordMatched) {
        //     return next(new errorHandler('Wrong old password', 400));
        // };
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                success:false, 
                message : "Password does not match"
            })
        }

        user.password = req.body.password;
        await user.save();
        sendToken(user, 200, res);

    } else if(req.body.role == 'admin') {

        const user = await User.findById(req.params.id).select('+password');

        //checking the old password
        // const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
        // if (!isPasswordMatched) {
        //     return next(new errorHandler('Wrong old password', 400));
        // };
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                success:false, 
                message : "Password does not match"
            })
        }

        user.password = req.body.password;
        await user.save();
        sendToken(user, 200, res);
        }
});




