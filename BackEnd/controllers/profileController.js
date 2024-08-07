const User = require("../models/userModel");
const sendEmail=require("../utils/helpers/sendEmail");
const {validatePassword}=require("../utils/helpers/validatePassword")
const bcrypt=require("bcryptjs");

const changeEmail=async(req,res)=>{
    const {currentEmail,newEmail,confirmEmail}=req.body;
    try {
         
        const user=await User.findOne({email:currentEmail});
        if(!user) res.status(400).json({message:"user doesn't exist"});
        if(newEmail!==confirmEmail) res.status(401).json({message:'the newEmail should be the same email writing in confirmEmail '});

        user.email=newEmail;
        await user.save();
        res.json({message:"Email changed successfully"});
        // await sendEmail(newEmail,'Email Changed', 'your email has been changed successfully');

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to change email"}); 
    }
};

const changePassword=async(req,res)=>{
    const {currentPassword,newPassword,confirmPassword}=req.body;
    try {
        const user=await User.findById({_id:req.user._id});
        if(!user) res.status(400).json({message:"user doesn't exist"});
        const isValidPassword=validatePassword(currentPassword);
        if(!isValidPassword.valid) res.status(401).json({message:isValidPassword.message});
        if(newPassword!==confirmPassword) res.status(401).json({message:'the newPassword should be the same password writing in confirmPassword '});
        const hashPassword=await bcrypt.hash(newPassword,10);
        user.password=hashPassword;
        await user.save();
        res.json({message:"Password changed successfully"});
        // await sendEmail(user.email,'Password Changed', 'your password has been changed successfully');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to change password"}); 
    }
}



module.exports={changeEmail,changePassword};