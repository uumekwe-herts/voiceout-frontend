import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";
import TopNav from '../components/Navigation/TopNav';

const AdminDashboard = () => {
  const nav = useNavigate();
 
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType');

    if(userType === configData.REGULAR_USER || userType === configData.ANONYMOUS_USER){
        nav('/user/dashboard');
      }
      
    })

    

  return (
    <div> 
      Admin Dashboard 
      <TopNav/>
    </div>
  )
}

export default AdminDashboard