import {Product} from '../models/productModel.js'
import ApiFeatures from '../utils/apifeatures.js';
import cloudinary from "cloudinary";

// create a Product --For Admin
export const newProduct=async(req,res,next)=>{
    try{
        let images=[];
        if(typeof(req.body.images)==="string"){
            images.push(req.body.images)
        }else{
            images=req.body.images
        }
        const imagesLinks=[]
        
        for(let i=0;i<images.length;i++){
            const result=await cloudinary.v2.uploader.upload(images[i],{
                folder:"products"
            })
            imagesLinks.push({
                public_id:String(result.public_id),
                url:String(result.secure_url)
            })
        }
        req.body.images=imagesLinks;

        req.body.user=req.user.id;
        const product=await Product.create(req.body);
        res.status(201).json({success:true,product});
    }catch(error){
        // console.log(error)
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
    const productsCount =await Product.countDocuments();

    
    try{
        let apiFeature=new ApiFeatures(Product.find(),req.query).search().filter();
        let products=await apiFeature.query;
        let filteredProductsCount=products.length;
        apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
        products=await apiFeature.query;

        res.status(200).json({success:true,products,productsCount, resultPerPage,filteredProductsCount})
    }catch(error){
        const err=new Error("products not found")
        err.status=404
        err.extraDetails=error.message
        next(err)
    
    }
    
}

// get All Products --For Admin
export const getAdminProducts = async(req, res,next) => {
    // console.log("from getAllProducts")
    const resultPerPage = 8;
    const productsCount =await Product.countDocuments();

    
    try{
        const products=await Product.find();

        res.status(200).json({success:true,products})
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
        if(req.body){
            const product=await Product.findById(req.params.id);
            const images=product.images;
            for(let i=0;i<images.length;i++){
                await cloudinary.v2.uploader.destroy(images[i].public_id)
            }
            let newImages=[];
            if(typeof(req.body.images)==="string"){
                newImages.push(req.body.images)
            }else{
                newImages=req.body.images
            }
            const imagesLinks=[]
            for(let i=0;i<newImages.length;i++){
                const result=await cloudinary.v2.uploader.upload(newImages[i],{
                    folder:"products"
                })
                imagesLinks.push({
                    public_id:String(result.public_id),
                    url:String(result.secure_url)
                })
            }
            req.body.images=imagesLinks;

        }
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
        const images=product.images;
        for(let i=0;i<images.length;i++){
            await cloudinary.v2.uploader.destroy(images[i].public_id)
        }
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
    const {rating,comment,productId}=req.body;3
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






