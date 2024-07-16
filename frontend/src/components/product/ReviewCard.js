import React from 'react'
import profilepng from "../../images/Profile.png"
import ReactStars from 'react-rating-stars-component';



const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color:"rgba(20,20,20,0.4)",
        activeColor:"tomato",
        size:window.innerWidth<725?13:18,
        value:review.rating,
        isHalf:true
    };

  return (
    <div className='reviewCard'>
        <img src={profilepng} alt='User' />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
