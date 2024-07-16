
import ReactStars from 'react-rating-stars-component';
import { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import {useDispatch,useSelector} from "react-redux";
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import "./productDetails.css";
import ReviewCard from './ReviewCard.js';


const ProductDetails=()=>{
    const {id}=useParams();
    // console.log("id",`/api/product/${id}`)
    const dispatch=useDispatch();
    
    const {product,loading}=useSelector(state=>state.productDetails);
    console.log("hgfgdgfhg",product.images,loading);
    useEffect(() => {
        // console.log("hello from useEffect in productDetails.js",id)
        dispatch(getProductDetails(id));
       }
     , [dispatch,id])
    
    
    const options = {
      edit: false,
      color:"rgba(20,20,20,0.4)",
      activeColor:"tomato",
      size:window.innerWidth<725?13:18,
      value:product.rating,
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
      <div className='productDetails'>
  
            {product.images &&
              <div className='carouselContainer'>
                <Carousel responsive={responsive}>
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
                <h1>{product.name}</h1>
              </div>
              <div className='productInfoBl-2'>
                <ReactStars {...options} /> <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className='productinfoBl-3'> 
                <h3>Price: ${product.price}</h3>
                <div className='productinfoBl-3-1'>
                  <div className='productInfoBl-3-1-1'>
                    <button>-</button>
                    <input value={1} type='number'/>
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
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
    </>
  );
}

export default ProductDetails;