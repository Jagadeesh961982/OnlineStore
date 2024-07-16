import {Product} from '../models/productModel.js'
import ApiFeatures from '../utils/apifeatures.js';


// create a Product --For Admin
export const newProduct=async(req,res,next)=>{
    try{
        req.body.user=req.user.id;
        const product=await Product.create(req.body);
        res.status(201).json({success:true,product});
    }catch(error){
        const err=new Error("Trouble in creating the product");
        err.status=400;
        err.extraDetails=error.message
        next(err)

    }
    
}

// get all products
export const getAllProducts = async(req, res,next) => {
    // console.log("from getAllProducts")
    const resultPerPage = 8;
    const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    try{
        const products=await apiFeature.query;
        res.status(200).json({success:true,productsCount:products.length,products
    })
    }catch(error){
        const err=new Error("products not found")
        err.status=404
        err.extraDetails=error.message
        next(err)
    
    }
    
}

// get a single product
export const getSingleProduct=async(req,res,next)=>{
    try{
        const product=await Product.findById(req.params.id)
        if(!product){
            const err=new Error("product_id not found")
            err.status=404
            return next(err)
        }
        res.status(200).json({success:true,product})
    }
    catch(error){
        const err=new Error("wrong product_id")
        err.status=404
        err.extraDetails=error.message
        next(err)
    }

    
    
}

// update a product --For Admin
export const updateProduct=async(req,res,next)=>{
    try{
        const upadtedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        if(!upadtedProduct){
            const err=new Error("product_id not found")
            err.status=404
            return next(err)
        }
        res.status(200).json({success:true,upadtedProduct})
    }catch(error){
        const err=new Error("product_id not found")
        err.status=404
        err.extraDetails=error.message
        next(err)
    }
    
}

// delete a product --For Admin
export const deleteProduct=async(req,res,next)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id)
        if(!product){
            const err=new Error("product_id not found")
            err.status=404
            return next(err)
        }
    res.status(200).json({success:true,
        message:"product deleted successfully"
    })
    }catch(error){
        const err=new Error("product_id not found")
        err.status=404
        err.extraDetails=error.message
        next(err)
    }
    
}

// Create new review and update the review
export const createProductReview=async(req,res,next)=>{
    try{
    const {rating,comment,productId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product=await Product.findById(productId);
    if(!product){
        const err=new Error("product not found with this id")
        err.status=404
        return next(err)
    }
    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id.toString()){
                rev.comment=comment;
                rev.rating=rating;
            }
        })
        

    }else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }

    let avg=0;
    product.reviews.forEach(rev=>avg+=rev.rating)
    product.rating=avg/product.reviews.length;
    
    await product.save({validateBeforeSave:false});
    res.status(200).json({success:true});
}catch(error){
    const err=new Error("can not create the review, please try again later")
    err.status=404
    err.extraDetails=error.message
    next(err)   
}

}

// get all reviews of a product
export const getProductReviews=async(req,res,next)=>{
    try{
    const product=await Product.findById(req.query.productId);
    res.status(200).json({success:true,reviews:product.reviews})
}catch(error){
    const err=new Error("product not found")
    err.status=404
    err.extraDetails=error.message
    next(err)

}
}

// Delete Reviews
export const deleteReview=async(req,res,next)=>{
    try{
    const product=await Product.findById(req.query.productId);
    if(!product){
        const err=new Error("product not found")
        err.status=404
        return next(err)
    }
    const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());
    let avg=0
    reviews.forEach(rev=>avg+=rev.rating);
    const rating=avg/reviews.length;
    const numOfReviews=reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{reviews,rating,numOfReviews},{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({success:true})
    }catch(error){
        const err=new Error("can not delete the review, please try again later")
        err.status=404
        err.extraDetails=error.message
        next(err)   
    }
}

