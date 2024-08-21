import React, { useEffect,useState } from 'react'
import './cartItemCard.css'
import { Link } from 'react-router-dom'
import { addItemToCart, getCartItems, removeItemFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../actions/userAction';
import { REMOVE_CART_ITEMS_RESET } from '../../constants/cartConstants';

const CartItemCard = ({item}) => {
  const dispatch=useDispatch();
  const {isDeleted,loading,error}=useSelector(state=>state.cart)
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

  }

  useEffect(()=>{
    if(error){
      toast.error(error.extraDetails?error.extraDetails:error.message);
      dispatch(clearErrors());
    }
    if(isDeleted){
      toast.success(`${item.name} removed from cart`);
      dispatch({type:REMOVE_CART_ITEMS_RESET})
    }
    const cartItem={
      product:item.product,
      name:item.name,
      price:item.price,
      image:item.image,
      stock:item.stock,
      quantity
    }
    dispatch(addItemToCart(cartItem));
    toast.success(`Quantity of ${item.name} updated to ${quantity}`);

  },[dispatch,quantity,toast,item,isDeleted,error])
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
                <input type="number" value={quantity} readOnly />
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