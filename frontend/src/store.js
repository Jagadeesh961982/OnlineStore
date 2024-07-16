import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { productReducer, productDetailsReducer} from "./reducers/productReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
});

let initialState = {};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
});

export default store;