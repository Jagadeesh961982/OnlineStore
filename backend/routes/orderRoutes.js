import express from 'express';
import { getAllOrders, getSingleOrder, getMyOrders, newOrder, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';
import {authorizeRole, isAuthenticatedUser} from '../middleware/authenticaton.js';

const router=express.Router();

// create a new order
router.post("/order/new",isAuthenticatedUser,newOrder);

// get single order details -- admin
router.get("/order/:id",isAuthenticatedUser,getSingleOrder);

// get logged in user orders
router.get("/orders/me",isAuthenticatedUser,getMyOrders)

// get all orders -- admin
router.get("/admin/orders",isAuthenticatedUser,authorizeRole("admin"),getAllOrders)

// update order status --admin
router.put("/admin/order/:id",isAuthenticatedUser,authorizeRole("admin"),updateOrderStatus)

// delete route --admin
router.delete("/admin/order/:id",isAuthenticatedUser,authorizeRole("admin"),deleteOrder)

export default router;