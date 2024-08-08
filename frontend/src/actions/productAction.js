import axios from 'axios';
import { ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERRORS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS } from '../../src/constants/productConstants';


const baseUrl=process.env.REACT_APP_BASE_URL;

export const getProducts=(keyword="",currentPage=1,price=[0,100000],category='',rating=0)=> async (dispatch) =>{
    try{
        dispatch({type:ALL_PRODUCTS_REQUEST});
        let link=`${baseUrl}/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`
        if(category){
            link=`${baseUrl}/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`
        }
        const response =await axios.get(link);
        
        dispatch({type:ALL_PRODUCTS_SUCCESS,payload:response.data});

    }catch(error){
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type:ALL_PRODUCTS_FAIL,payload:errorMessage});
    }
}

export const getProductDetails=(id)=>async (dispatch)=>{

    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const response=await axios.get(`${baseUrl}/api/product/${id}`);  
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:response.data});

    }catch(error){
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:errorMessage});
        
    }
}

export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}