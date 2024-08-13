import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, adminProductReducer} from "./reducers/productReducer";
import {allUsersReducer, forgotPasswordReducer, profileReducer, userLoginRegisterReducer} from "./reducers/userReducer"
import { allOrdersReducer, getMyOrdersReducer, newOrderReducer, orderReducer } from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    userLoginRegister:userLoginRegisterReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:getMyOrdersReducer,
    review:newReviewReducer,
    newProduct:newProductReducer,
    adminProduct:adminProductReducer,
    allOrders:allOrdersReducer,
    adminOrder:orderReducer,
    allUsers:allUsersReducer,

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