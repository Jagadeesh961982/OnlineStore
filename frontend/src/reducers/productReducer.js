import { ALL_PRODUCTS_FAIL,ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";


// const initialState = {
//     products: [],
//     product: {},
//     loading: false,
//     error: null,
// };
export const productReducer = (state = {products:[]},action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case ALL_PRODUCTS_SUCCESS:
            console.log("from prdr",action.payload);
            return {
                loading:false,
                products:action.payload.products,
            }
        case ALL_PRODUCTS_FAIL:
            return {
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
            return state;
    }
};

export const productDetailsReducer=(state={product:{}},action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading:true,
                product:{},
            }
            
        case PRODUCT_DETAILS_SUCCESS:
            console.log('Reducer updating state with product:', action.payload);
            return{
                loading:false,
                product:action.payload.product,
            }
        case PRODUCT_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
    
        default:
            return state;
    }
}