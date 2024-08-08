import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";

export const isAuthenticatedUser=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        // console.log(token)
        if(!token){
            const err=new Error("Login first to access this route")
            err.status=401;
            return next(err)
        }
        const decodeData=jwt.verify(token,process.env.JWT_SECRET);
        const data=await User.findById(decodeData.id) ;
        req.user=data;
        next();
    }catch(error){
        const err=new Error("Not authorised to access this route")
        err.status=401;
        next(err)
    }

}

export const authorizeRole=(...roles)=>{
    // console.log(roles)
    return (req,res,next)=>{
        if(!roles.includes(req.user.isAdmin?"admin":"user")){
            const err=new Error(`Role (${req.user.isAdmin?"admin":"user"}) is not allowed to access this route`)
            err.status=403;
            return next(err)
        }
        next();
    }

}