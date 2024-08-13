import User from "../models/usersModel.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import { stringify } from "querystring";

// register a user
export const registerUser=async(req,res,next)=>{
    let user;
    try{
        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        })
        let {name,email,password}=req.body;
        // console.log(myCloud.public_id,myCloud.secure_url,name,email,password)
        const public_id=myCloud.public_id;
        const url=myCloud.secure_url;
        // console.log({
        //     name,email,password,
        //     avatar:{
        //         public_id:String(public_id),
        //         url:String(url)
        //     }
        // })
        user=await User.create({
            name,email,password,
            avatar:{
                public_id:String(public_id),
                url:String(url)
            }
        })
        // console.log(user)
        sendToken(user,201,res)
    }catch(error){
        const err=new Error("Trouble in creating the user")
        err.status=400;

        if(error.code===11000){
            error.message="User already exists with this email"

        }
        err.extraDetails=error.message
        next(err)
    }finally{
        console.log(user)
    }
}

// Login User
export const loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            const err=new Error("Please enter email and password")
            err.status=400;
            next(err)

        }
        const user=await User.findOne({email}).select("+password");
        if(!user){
            const err=new Error("Invalid email or password")
            err.status=401;
            return next(err)
        }
        const isPasswordMatched=await user.comparePassword(password);
        if(!isPasswordMatched){
            const err=new Error("Invalid email or password")
            err.status=401;
            return next(err)
        }
        sendToken(user,200,res)
    }catch(error){
        const err=new Error("Trouble in login")
        err.status=400;
        err.extraDetails=error.message
        next(err)
    }
}

// logout user
export const logOutUser=async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({success:true,message:"Logged out successfully"})
}

// Forgot password
export const forgotPassword=async(req,res,next)=>{
    try{
        const user=await User.findOne({
            email:req.body.email
        })
        if(!user){
            const err=new Error("User not found with this email")
            err.status=404;
            return next(err)
        }   
        const resetToken=user.getResetPasswordToken();
        await user.save({validateBeforeSave:false});
        // console.log(req)
        // const resetPasswordUrl=`${req.protocol}://${req.origin}/${req.path}/${resetToken}`
        const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`
        const message=`Your password reset token is:-\n\n${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it`
        try{
            await sendEmail({
                email:user.email,
                subject:"Ecommerce Password Recovery",
                message
            })
            res.status(200).json({success:true,message:`Email sent to ${user.email}`})
        }catch(error){
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save({validateBeforeSave:false})
            const err=new Error("Email could not be sent")
            err.status=500;
            return next(err)
        }
        
        
    }catch(error){
        const err=new Error("Trouble in resetting password")
        err.status=400;
        err.extraDetails=error.message
        next(err)
    }
}

// Reset password
export const resetPassword=async(req,res,next)=>{
    try{
        const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        })
        if(!user){
            const err=new Error("Invalid token")
            err.status=400;
            return next(err)
        }
        if(req.body.password!==req.body.confirmPassword){
            const err=new Error("Password does not match")
            err.status=400;
            return next(err)
        }

        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        sendToken(user,200,res)
    }catch(error){
        const err=new Error("Trouble in resetting password")
        err.status=400;
        err.extraDetails=error.message
        next(err)
    }
}

// get the user profile
export const userDetails=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        res.status(200).json({success:true,user})
    }catch(error){
        const err=new Error("Trouble in fetching user details")
        err.status=400;
        err.extraDetails=error.message
        next(err)
    }
}

// update the user password
export const updatePassword=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id).select("+password");
        const isMatched=await user.comparePassword(req.body.oldPassword);   
        if(!isMatched){
            const err=new Error("Old password is incorrect")
            err.status=400;
            return next(err)
        }
        if(req.body.password!==req.body.confirmPassword){
            const err=new Error("Password does not match")
            err.status=400;
            return next(err)
        }
        user.password=req.body.password;
        await user.save();
        sendToken(user,200,res)  

    }catch(error){
        const err=new Error("Trouble in updating password")
        err.status=400;
        err.extraDetails=error.message
        next(err)
    }
}

// update the user profile
export const updateProfile=async(req,res,next)=>{

    try{
        let newuserData={
            name:req.body.name,
            email:req.body.email
        };
        if(req.body.avatar!==""){
        const user=await User.findById(req.user.id);
        const image_id=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(image_id);

        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        })
        const public_id=myCloud.public_id;
        const url=myCloud.secure_url;
        newuserData.avatar={
            public_id:String(public_id),
            url:String(url)
        }
    }
        const user=await User.findByIdAndUpdate(req.user.id,newuserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({success:true})
    }catch(error){
        const err=new Error("Trouble in updating user profile")
        err.status=400;
        if(error.code===11000){
            error.message="User already exists with this email"

        }
        err.extraDetails=error.message
        next(err)
    }
}

// get all users
export const getAllUsers=async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({success:true,users})
}

// get single user by admin
export const getSingleUser=async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        const err=new Error("User not found with this id")
        err.status=404;
        return next(err)
    }
    res.status(200).json({success:true,user})
}

// update user role by admin
export const updateUserRole=async(req,res,next)=>{
    console.log("its working")
    const user=await User.findById(req.params.id);
    if(!user){
        const err=new Error("User not found with this id")
        err.status=404;
        return next(err)
    }
    user.isAdmin=req.body.isAdmin;
    await user.save();
    res.status(200).json({success:true,user})
}

// delete user by admin
export const deleteUser=async(req,res,next)=>{
    const user=await User.findByIdAndDelete(req.params.id);
    if(user.avatar){
        const image_id=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(image_id)
    }
    if(!user){
        const err=new Error("User not found with this id")
        err.status=404;
        return next(err)
    }  
    
    res.status(200).json({success:true,message:"User deleted successfully"})
}

