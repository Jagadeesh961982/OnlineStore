import React from 'react'
import './dashboard.css'
import Sidebar from './Sidebar.js'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Doughnut,Line } from 'react-chartjs-2';
import { Chart, CategoryScale,LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale,LinearScale, PointElement, LineElement);
const Dashboard = () => {

  const lineState = {
    labels:["Initial Amount","Amount Earned"],
    datasets:[
      {
        label:"Total Amount",
        backgroundColor:["tomato"],
        hoverBackgroundColor:["rgb(197,72,49"],
        data:[0,4000],
      },
    ],
  }
  return (
    <div className='dashboard'>
        <Sidebar />
        <div className='dashboardContainer' >
            <Typography component="h1">Dashboard</Typography>
            <div className='dashboardSummary'>
              <div className='dashboardSummaryBox1'>
                <p>Total Amount <br />2000</p>
              </div>
              <div className='dashboardSummaryBox2'>
                <Link to='/admin/products'>
                  <p>Product</p>
                  <p>50</p>
                </Link>
                <Link to='/admin/orders'>
                  <p>Orders</p>
                  <p>50</p>
                </Link>
                <Link to='/admin/users'>
                  <p>Users</p>
                  <p>10</p>
                </Link>
              </div>
            </div>
            <div className='lineChart'>
              <Line data={lineState} />
            </div>
        </div>

    </div>
  )
}

export default Dashboard