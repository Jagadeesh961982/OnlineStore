import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { productReducer, productDetailsReducer} from "./reducers/productReducer";
import {userLoginRegisterReducer} from "./reducers/userReducer"

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    userLoginRegister:userLoginRegisterReducer,

});

let initialState = {};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
});

export default store;