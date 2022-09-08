import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";
import TopNav from '../components/Navigation/TopNav';

const UserDashboard = () => {
  const nav = useNavigate();
 
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType');

    if(userType === configData.ANONYMOUS_USER){
        axios.get(configData.SERVER_URL+"anonymous/profile",{
          headers:{
            'Authorization' : 'Bearer ' + token
          }
        })
        .then((response) => {
            console.log(response.data)
        });
      }

      if(userType === configData.REGULAR_USER){
        axios.get(configData.SERVER_URL+"user/profile",{
          headers:{
            'Authorization' : 'Bearer ' + token
          }
        })
        .then((response) => {
            console.log(response.data)
        });
      }

    })

    

  return (
    <div> 
      User Dashboard (Anonymous and Regular)
      <TopNav/>
    </div>
  )
}

export default UserDashboard