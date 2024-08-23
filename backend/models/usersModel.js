import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        maxLenght:[30,"Name can not exceed 30 characters"],
        minLenght:[4,"Name must be at least 4 characters"],
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"user already exists"],
        validate:[validator.isEmail,"Please enter a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLenght:[6,"Password must be at least 6 characters"],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    
    cartItems:[
        {
            product:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            name:{
                type:String,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            stock:{
                type:Number,
                required:true
            }


        }
    ],
    resetPasswordToken:String,
    resetPasswordExpire:Date
    },
    {
        timestamps:true
    }
    
)

// Encrypting password before saving user
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})
// JWT Token
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

// compare password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
    
}

// Generate password reset token
userSchema.methods.getResetPasswordToken=function(){
    // Generate token
    const resetToken=crypto.randomBytes(20).toString("hex");

    // hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}
export default mongoose.model("User",userSchema)