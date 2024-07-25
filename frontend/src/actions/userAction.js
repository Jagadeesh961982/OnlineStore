import axios from "axios";
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userContants";

const baseUrl=process.env.REACT_APP_BASE_URL;


// Login
export const userLogin=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:USER_LOGIN_REQUEST})
        const response=await axios.post(`${baseUrl}/api/login`,{email,password},{withCredentials:true})
        dispatch({type:USER_LOGIN_SUCCESS,payload:response.data})

    }catch(error){
        dispatch({type:USER_LOGIN_FAIL,payload:error.response.data})
    }
}

// Register
export const userRegister=(userData)=>async(dispatch)=>{
    try{
        dispatch({type:USER_REGISTER_REQUEST})
        // const config={Headers:{'Content-Type':'multipart/form-data'}}
        const response=await axios.post(`${baseUrl}/api/register`,userData,config,{withCredentials:true,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        dispatch({type:USER_REGISTER_SUCCESS,payload:response.data})
    }catch(error){
        dispatch({type:USER_REGISTER_FAIL,payload:error.response.data})
    }
}

// Load User
export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST})
        const response=await axios.get(`${baseUrl}/api/profile`,{withCredentials:true})
        dispatch({type:LOAD_USER_SUCCESS,payload:response.data})

    }catch(error){
        dispatch({type:LOAD_USER_FAIL,payload:error.response.data})
    }
}


export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}