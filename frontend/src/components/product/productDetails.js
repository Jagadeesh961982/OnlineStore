
import ReactStars from 'react-rating-stars-component';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import {useDispatch,useSelector} from "react-redux";
import { clearErrors, getProductDetails } from '../../actions/productAction.js';
import { useParams } from 'react-router-dom';
import "./productDetails.css";
import ReviewCard from './ReviewCard.js';
import Loading from '../layout/Loading/Loading.js';
import MetaData from '../layout/MetaData.js';
import { addItemToCart } from '../../actions/cartActions.js';
import {toast} from "react-toastify";


const ProductDetails=()=>{
    const {id}=useParams();
    const dispatch=useDispatch();
    const {product,loading,error}=useSelector(state=>state.productDetails);
    const [quantity,setQuantity]=useState(1);

    const increaseQuantity=()=>{
      if(product.stock>quantity && quantity<5){
          setQuantity(quantity+1);
      }
      
    }

    const decreaseQuantity=()=>{
      if(quantity>1){
        setQuantity(quantity-1);
      }
    }

    const addToCartHandler=()=>{
      if(product.stock===0){
        toast.error("This item is currently out of Stock")
        return
      }
      dispatch(addItemToCart(id,quantity));
      toast.success("Item Added to Cart");

    }

    useEffect(()=>{
      dispatch(getProductDetails(id));
      if(error){
        dispatch(clearErrors());
      }

    },[dispatch,id,error]);
    
    const options = {
      edit: false,
      color:"rgba(20,20,20,0.4)",
      activeColor:"tomato",
      size:window.innerWidth<725?13:18,
      value:product?.rating || 0,
      isHalf:true
  };
    
    const responsive = {
      superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
      },
      desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
      },
      tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
      },
      mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
      }
  };



  return (
    <>
    {loading?<Loading />:
    (<>
      <MetaData title={`${product.name} --Ecommerce`} />
      <div className='productDetails'>
  
          {product.images &&
            <div className='carouselContainer'>
              <Carousel responsive={responsive} style={{zIndex:10}}>
                  {product.images.map((image) => (
                    <div key={image._id}>
                      <img src={image.url} alt={product.name} className='carouselImg' />
                    </div>
                  ))}
              </Carousel>
            </div>
          }
          
          
          <div className='productInfo'>
              <div className='productInfoBl-1'>
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className='productInfoBl-2'>
                <ReactStars {...options} /> 
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className='productInfoBl-3'> 
                <h3>Price: ₹{product.price}</h3>
                <div className='productInfoBl-3-1'>
                  <div className='productInfoBl-3-1-1'>
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type='number'/>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                    Status:
                      <b className={product.stock<1?"redColor":"greenColor"}>
                        {product.stock<1?"Out of Stock":"In Stock"}
                      </b>
                </p>
              </div>
          </div>
      </div>
      <div className='reviewHeading'>
        <h2>Reviews</h2>
        {product.reviews && product.reviews[0] ?
        (<div className='reviews'>{
          product.reviews.map((review)=>(
            <ReviewCard review={review} />
          ))
        }
        </div>):((<p className='noReviews'>No Reviews Yet</p>))}
      </div>
    </>)
}
</>
);
}

export default ProductDetails;