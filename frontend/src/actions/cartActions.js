import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";


const BASE_URL = "http://localhost:5000";
export const addItemToCart=(id,quantity)=>async(dispatch,getState)=>{
    const {data}=await axios.get(`${BASE_URL}/api/product/${id}`);
    dispatch({type:ADD_TO_CART,payload:{
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0].url,
        stock:data.product.stock,
        quantity
    }})
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart=(id)=>async(dispatch,getState)=>{
    dispatch({type:REMOVE_FROM_CART,payload:id})
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo=(data)=>async(dispatch)=>{
    dispatch({type:SAVE_SHIPPING_INFO,payload:data})
    localStorage.setItem('shippingInfo',JSON.stringify(data))
}