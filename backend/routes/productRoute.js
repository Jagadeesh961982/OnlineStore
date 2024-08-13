import express from 'express';
import { getAllProducts,newProduct,updateProduct ,getSingleProduct,deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts} from '../controllers/productController.js';
import { isAuthenticatedUser ,authorizeRole} from '../middleware/authenticaton.js';

const router=express.Router();

// get all products
router.get("/products",getAllProducts);

//  get all admin products
router.get("/admin/products",isAuthenticatedUser,authorizeRole("admin"),getAdminProducts);

// get a single product
router.get("/product/:id",getSingleProduct)

// create a new product --For Admin
router.post("/admin/product/new",isAuthenticatedUser,authorizeRole("admin"),newProduct);

// update a product --For Admin
router.put("/admin/product/:id",isAuthenticatedUser,authorizeRole("admin"),updateProduct)

// delete a product --For Admin
router.delete("/admin/product/:id",isAuthenticatedUser,authorizeRole("admin"),deleteProduct)

// create a new review
router.put("/review",isAuthenticatedUser,createProductReview)

// get all reviews of a product
router.get("/reviews",getProductReviews)

// delete a review
router.delete("/review",isAuthenticatedUser,deleteReview)

export default router;