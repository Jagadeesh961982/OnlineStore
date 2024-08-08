import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";
import { isAction } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000";


// cerate order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${BASE_URL}/api/order/new`, order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all orders
export const getMyorders=()=>async(dispatch)=>{
  console.log("from getMyorders")
    try {
        dispatch({type:MY_ORDERS_REQUEST})
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
    
        const response=await axios.get(`${BASE_URL}/api/orders/me`,config)
        console.log(response)
        dispatch({type:MY_ORDERS_SUCCESS,payload:response.data.orders})
    }catch(error){
        dispatch({type:MY_ORDERS_FAIL,payload:error.response.data.message})
    }
}

// get order details
export const getOrderDetails=(id)=>async(dispatch)=>{
  try{
    dispatch({type:ORDER_DETAILS_REQUEST})
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const {data}=await axios.get(`${BASE_URL}/api/order/${id}`,config)
    dispatch({type:ORDER_DETAILS_SUCCESS,payload:data.order})
  }catch(error){
    dispatch({type:ORDER_DETAILS_FAIL,payload:error.response.data.message})
  }
}

export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}