import Order from '../models/orderModel.js';
import { Product } from '../models/productModel.js'

// create an order
export const newOrder=async(req,res,next)=>{
    try{
    const {orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo}=req.body;
    const order=await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(201).json({success:true,order})
}catch(error){
    const err=new Error("Trouble in creating the order");
    err.status=400;
    err.extraDetails=error.message
    next(err)
}
}

// get single order
export const getSingleOrder=async(req,res,next)=>{
    try{
        const order=await Order.findById(req.params.id).populate('user','name email')  //populate takes the user field i.e user id from order and takes the name and email from user details
        if(!order){
            const error=new Error("Order not found")
            error.status=404
            return next(error)
        }
        res.status(200).json({success:true,order})
    }catch(error){
        const err=new Error("Order not found")
        err.status=404
        err.extraDetails=error.message
        next(err)
    }
}

// get logged in user orders
export const getMyOrders=async(req,res,next)=>{
    
    try {
        const orders=await Order.find({user:req.user._id})
        if(!orders){
            const error=new Error("No orders found")
            error.status=404
            return next(error)
        }
        res.status(200).json({success:true,orders})
    } catch (error) {
        const err=new Error("No orders found")
        err.status=404
        err.extraDetails=error.message
        next(err)
        
    }
}

// get all orders -- admin
export const getAllOrders=async(req,res,next)=>{
    try {
        const orders=await Order.find()
        let totalAmount=0;
        orders.forEach(order=>{
            totalAmount+=order.totalPrice
        })
        res.status(200).json({success:true,totalAmount,orders})
    } catch (error) {
        const err=new Error("No orders found")
        err.status=404
        err.extraDetails=error.message
        next(err)
        
    }
}

// update order status --admin
export const updateOrderStatus=async(req,res,next)=>{
    try {
        const {orderStatus}=req.body;
        const order=await Order.findById(req.params.id)
        if(!order){
            const error=new Error("Order not found")
            error.status=404
            return next(error)
        }
        if(order.orderStatus==="Delivered"){
            const error=new Error("Order already delivered")
            error.status=404
            return next(error)
        }
        order.orderItems.forEach(async item=>{
            await updateStock(item.product,item.quantity)
    
        })
    
        order.orderStatus=orderStatus;
        if(orderStatus==="Delivered"){
            order.deliveredAt=Date.now()
        }
        await order.save({validateBeforeSave:false})
        res.status(200).json({success:true,order})
    } catch (error) {
        const err=new Error("Order not found")
        err.status=404
        err.extraDetails=error.message
        next(err)
        
    }
}

async function updateStock(productId,quantity){
    const product =await Product.findById(productId)
    product.stock=product.stock-quantity
    await product.save({validateBeforeSave:false})
}

// delete order --admin
export const deleteOrder=async(req,res,next)=>{
    try {
        const order=await Order.findByIdAndDelete(req.params.id)
        if(!order){
            const error=new Error("Order not found")
            error.status=404
            return next(error)
        }
        res.status(200).json({success:true})
    } catch (error) {
        const err=new Error("Order not found")
        err.status=404
        err.extraDetails=error.message
        next(err)
        
    }
}