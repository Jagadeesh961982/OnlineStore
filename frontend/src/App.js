
import './App.css';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ProductDetails from './components/product/ProductDetails.js';
import Products from './components/product/Products.js';
import Search from "./components/product/Search.js";
import LoginSignup from './components/userAuth/LoginSignup.js';
import store from './store.js';
import { useEffect } from 'react';
import { loadUser } from './actions/userAction.js';
import { useDispatch,useSelector } from 'react-redux';
import UserOptions from './components/layout/Header/UserOptions.js';

function App() {
  const dispatch=useDispatch();
  const {isAuthenticated,loading,user}=useSelector(state=>state.userLoginRegister)
  useEffect(()=>{
    store.dispatch(loadUser())
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
