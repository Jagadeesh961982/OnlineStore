import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getProducts,clearErrors } from '../../actions/productAction'
import { useEffect } from 'react'

const Products = () => {
    const dispatch=useDispatch();
    const {products,loading,error}=useSelector(state=>state.products);
    console.log(products,loading,error);

    useEffect(()=>{

        // console.log("hello from useEffect in Products.js")
        // dispatch(getProducts());
        // if(error){
        //     dispatch(clearErrors());
        // }
    },[dispatch])

  return (
    <div>Products</div>
  )
}

export default Products