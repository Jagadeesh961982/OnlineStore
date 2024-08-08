import React from 'react'
import './orderSuccess.css'
import { Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const OrderSuccess = () => {
  return (
    <>  
        <MetaData title="Order Success" />
        <div className="orderSuccess">
            <CheckCircleIcon className="checkCircle" />
            <Typography>Your Order has been placed successfully</Typography>
            <Link to="/orders">Go to Orders</Link>
        </div>
    </>
  )
}

export default OrderSuccess