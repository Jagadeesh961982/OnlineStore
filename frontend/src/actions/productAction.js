import axios from 'axios';
import { ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERRORS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS } from '../../src/constants/productConstants';


const baseUrl=process.env.REACT_APP_BASE_URL;
console.log(baseUrl)
export const getProducts=()=> async (dispatch) =>{
    try{
        dispatch({type:ALL_PRODUCTS_REQUEST});
        // console.log("hello from getProducts")
        const {data} =await axios.get(`${baseUrl}/api/products`);
        dispatch({type:ALL_PRODUCTS_SUCCESS,payload:data});

    }catch(error){
        dispatch({type:ALL_PRODUCTS_FAIL,payload:error.data.message});
    }
}

export const getProductDetails=(id)=>async (dispatch)=>{

    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        // console.log(`/api/product/${id}`)
        const {data}=await axios.get(`${baseUrl}/api/product/${id}`);
        // console.log(data);
        
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data.product});

    }catch(error){
        console.log("error",error.data.message);
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.data.message});
        
    }
}

export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}