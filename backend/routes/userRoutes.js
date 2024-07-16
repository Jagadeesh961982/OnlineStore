import {loginUser, registerUser,logOutUser,forgotPassword,resetPassword,userDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser} from "../controllers/userController.js";
import {authorizeRole, isAuthenticatedUser} from "../middleware/authenticaton.js";
import express from "express";


const router=express.Router();


// register a user

router.post("/register",registerUser);

// Login User
router.post("/login",loginUser)

// logout user
router.get("/logout",logOutUser)

// forgot password
router.post("/password/reset",forgotPassword)

// reset password
router.put("/password/reset/:token",resetPassword)

// get the user profile
router.get("/profile",isAuthenticatedUser,userDetails)

// update the password
router.put("/password/update",isAuthenticatedUser,updatePassword)

// update user profile
router.put("/profile/update",isAuthenticatedUser,updateProfile)

// get all users (admin)
router.get("/admin/users",isAuthenticatedUser,authorizeRole("admin"),getAllUsers)

//get single user by (admin)
router.get("/admin/user/:id",isAuthenticatedUser,authorizeRole("admin"),getSingleUser)

// update user role by (admin)
router.put("/admin/user/:id",isAuthenticatedUser,authorizeRole("admin"),updateUserRole)

// delete user by (admin)
router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRole("admin"),deleteUser)

export default router;