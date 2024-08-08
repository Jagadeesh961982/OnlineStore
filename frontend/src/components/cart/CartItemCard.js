import React, { useEffect,useState } from 'react'
import './cartItemCard.css'
import { Link } from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const CartItemCard = ({item}) => {
  const dispatch=useDispatch();


  const [quantity,setQuantity]=useState(item.quantity);

  const increaseQuantity=()=>{
    if(item.stock>quantity && quantity<5){
        setQuantity(quantity+1);
    }
    else{
      toast.success(`we are sorry!,only ${quantity} item(s) allowed in each order`)
    }
  }
  const decreaseQuantity=()=>{
    if(quantity>1){
      setQuantity(quantity-1);
    } 
  }

  const removeItem=()=>{
    dispatch(removeItemFromCart(item.product));
    toast.success(`${item.name} removed from cart`);
  }

  useEffect(()=>{
    dispatch(addItemToCart(item.product,quantity));
    toast.success(`Quantity of ${item.name} updated to ${quantity}`);

  },[dispatch,quantity])
  return (
    <>
        <div className='cartItemCardContainer'>
          <div className='cartItemDetails'>
            <img src={item.image} alt={item.name} />
            <div >
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`price: ₹${item.price}`}</span>
                <a onClick={removeItem}>Remove</a>
            </div>
          </div> 
          <div className='cartItemInput'>
                <button onClick={decreaseQuantity}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={increaseQuantity}>+</button>
          </div>
          <div className='cartItemTotal'>
            <span>{`₹${item.price*item.quantity}`}</span>
          </div>
        </div>
    </>
  )
}

export default CartItemCard