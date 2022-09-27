import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";
import TopNav from '../components/Navigation/TopNav';
import SideNav from '../components/Navigation/SideNav';

const UserDashboard = () => {
  const nav = useNavigate();

  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType');
  const userId = localStorage.getItem('userId');
  const [userCases, setUserCases] = useState([]);

  const loadUserCases = async(e) => { 
    let response = await axios.get(configData.SERVER_URL+"cases/"+userId+"/"+userType,{
      headers:{
        'Authorization' : 'Bearer ' + token
      }
    })
    console.log(response.data);
    setUserCases(response.data);
  }

  useEffect(() => {
    loadUserCases();
    if(userType === configData.ADMIN_USER){
      nav('/admin/dashboard');
    }

    if(userType === configData.USER_TYPE.ANONYMOUS){
      //do something here 
      }

      if(userType === configData.REGULAR_USER){
        // axios.get(configData.SERVER_URL+"user/profile",{
        //   headers:{
        //     'Authorization' : 'Bearer ' + token
        //   }
        // })
        // .then((response) => {
        //    // console.log(response.data)
        //   //localStorage.setItem('user', response.data.email);
        // });
      }

    })

    

  return (
    <> 
      <TopNav/>
      <SideNav userType={localStorage.getItem('userType')}/>
      <main>
        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                <h1 class="font-bold pl-2">My Cases </h1>
            </div>
          </div>

          <div class="mx-2">
              {  userCases.length === 0 ? (" You have no cases reported yet."): 
                userCases.map(function(item, i){
                  console.log('test');
                  return (<div class=" container lg:w-9/12  justify-center mt-3 ">
                    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-full">
                      <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Case Id: {item.case_id}</h5>
                      <p class="text-gray-700 text-base">Reporting For: {item.reporting_for}</p>
                      <p class="text-gray-700 text-base">Phone Number: {item.phone_number}</p>
                      <p class="text-gray-700 text-base mb-4">Date of incident: {item.date_of_incident}</p>
                      <a type="button" href={`case/${item.id}`} class=" inline-block px-6 py-1.5 bg-blue-600 text-white font-medium text-xs 
                      rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                      focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                      transition duration-150 ease-in-out">Case details</a>
                    </div>
                </div>);
                })
            }
            </div>

        </div>
      </main>
    </>
  )
}

export default UserDashboard