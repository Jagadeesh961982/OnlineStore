import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';


const Product = (product) => {
    product=product.product;
    const options = {
        edit: false,
        color:"rgba(20,20,20,0.4)",
        activeColor:"tomato",
        size:window.innerWidth<725?13:18,
        value:product.rating,
        isHalf:true
    };
    return (
        <Link to={`product/${product._id}`} className='productCard'>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span>({product.numOfReviews} Reviews)</span>
            </div>
            <span>₹{product.price}</span>
        </Link>
    );
};

export const productDetails=(product)=>{
    product=product.product;
    const options = {
        edit: false,
        color:"rgba(20,20,20,0.4)",
        activeColor:"tomato",
        size:window.innerWidth<725?13:18,
        value:product.rating,
        isHalf:true
    };
    return (
        <div className='productDetails'>
            <div className='productDetails__images'>
                <img src={product.images[0].url} alt={product.name} />
                <div>
                    <img src={product.images[1].url} alt={product.name} />
                    <img src={product.images[2].url} alt={product.name} />
                </div>
            </div>
            <div className='productDetails__info'>
                <h2>{product.name}</h2>
                <div>
                    <ReactStars {...options} /> <span>({product.numOfReviews} Reviews)</span>
                </div>
                <h3>₹{product.price}</h3>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
export default Product;