import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { productReducer, productDetailsReducer} from "./reducers/productReducer";
import {forgotPasswordReducer, profileReducer, userLoginRegisterReducer} from "./reducers/userReducer"
import { getMyOrdersReducer, newOrderReducer } from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    userLoginRegister:userLoginRegisterReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:getMyOrdersReducer,

});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{}
    },
    
    
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
});

export default store;