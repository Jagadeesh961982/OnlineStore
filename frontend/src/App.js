
import './App.css';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ProductDetails from './components/product/ProductDetails.js';
import Products from './components/product/Products.js';
import Search from "./components/product/Search.js";
import LoginSignup from './components/userAuth/LoginSignup.js';
import Profile from './components/userAuth/Profile.js';
import store from './store.js';
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userAction.js';
import { useDispatch,useSelector } from 'react-redux';
import UserOptions from './components/layout/Header/UserOptions.js';
import UpdateProfile from './components/userAuth/UpdateProfile.js';
import UpdatePassword from './components/userAuth/UpdatePassword.js';
import ForgotPassword from './components/userAuth/ForgotPassword.js';
import ResetPassword from './components/userAuth/ResetPassword.js';
import Cart from './components/cart/Cart.js';
import Shipping from './components/cart/Shipping.js';
import ConfirmOrder from './components/cart/ConfirmOrder.js';
import Payment from './components/cart/Payment.js';
import OrderSuccess from './components/cart/OrderSuccess.js';
import MyOrders from './components/Orders/MyOrders.js';
import OrderDetails from './components/Orders/OrderDetails.js';
import Dashboard from './components/admin/Dashboard.js'
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const baseUrl=process.env.REACT_APP_BASE_URL;
  const {isAuthenticated,loading,user}=useSelector(state=>state.userLoginRegister)
  const [stripeApiKey,setStripeApiKey]=useState(process.env.STRIPE_API_KEY)
  const getStripeApiKey=async()=>{
   
    try{
      const {data}=await axios.get(`${baseUrl}/api/stripeapikey`,{withCredentials:true})
      setStripeApiKey(data.stripeApiKey)
    }catch(err){
      console.log(err)
    }
    
  }
  useEffect(()=>{

    store.dispatch(loadUser())
    getStripeApiKey()
  },[])
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user.user}/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/account' element={<Profile/>} />
        {isAuthenticated && <Route path='/password/update' element={<UpdatePassword />} />}
        {isAuthenticated && <Route path='/profile/update' element={<UpdateProfile/>} />}
        <Route path='/password/forgot' element={<ForgotPassword/>} />
        <Route path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route path='/cart' element={<Cart />} />
        {isAuthenticated && <Route path='/shipping' element={<Shipping/>} />}
        {isAuthenticated && <Route path='/order/confirm' element={<ConfirmOrder/>} />}
        {isAuthenticated && stripeApiKey && (<Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />)}
        {isAuthenticated && <Route path='/success' element={<OrderSuccess/>} />}
        {isAuthenticated && <Route path='/orders' element={<MyOrders/>} />}
        {isAuthenticated && <Route path='orders/:id' element={<OrderDetails />} />}
        {isAuthenticated && <Route path='/admin/dashboard' element={<Dashboard />} />}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
