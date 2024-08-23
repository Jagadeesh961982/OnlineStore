import {loginUser, registerUser,logOutUser,forgotPassword,resetPassword,userDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser, feedback, getAllFeedbacks, deleteFeedback, addCartItems, removeCartItems, getAllCartItems, addShippingDetails, getShippingDetails, removeAllCartItems} from "../controllers/userController.js";
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

// add cart items
router.put("/cart/add",isAuthenticatedUser,addCartItems)


// add shipping info
router.put("/shipping",isAuthenticatedUser,addShippingDetails)

// get shipping info
router.get("/shipping",isAuthenticatedUser,getShippingDetails)

// get cart items
router.get("/cart",isAuthenticatedUser,getAllCartItems)

// remove cart items
router.put("/cart/remove",isAuthenticatedUser,removeCartItems)

// remove all cart items
router.put("/cart/removeall",isAuthenticatedUser,removeAllCartItems)

// feedback by user
router.put("/feedback",isAuthenticatedUser,feedback)

// get all users (admin)
router.get("/admin/users",isAuthenticatedUser,authorizeRole("admin"),getAllUsers)

//get single user by (admin)
router.get("/admin/user/:id",isAuthenticatedUser,authorizeRole("admin"),getSingleUser)

// update user role by (admin)
router.put("/admin/user/:id",isAuthenticatedUser,authorizeRole("admin"),updateUserRole)

// delete user by (admin)
router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRole("admin"),deleteUser)

// get All user Feedbacks by admin
router.get("/admin/feedbacks",isAuthenticatedUser,authorizeRole("admin"),getAllFeedbacks)

// delete feedback by admin
router.delete("/admin/feedback/:id",isAuthenticatedUser,authorizeRole("admin"),deleteFeedback)

export default router;