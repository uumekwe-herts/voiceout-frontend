import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";
import TopNav from '../components/Navigation/TopNav';

const UserDashboard = () => {
  const nav = useNavigate();
 
  useEffect(() => {
    const token = localStorage.getItem('token')

    axios.get(configData.SERVER_URL+"anonymous/dashboard",{
      headers:{
        'Authorization' : 'Bearer ' + token
      }
    })
    .then((response) => {
        console.log(response.data)
    });
  })

  return (
    <div> 
      User Dashboard (Anonymous and Regular)
      <TopNav/>
    </div>
  )
}

export default UserDashboard