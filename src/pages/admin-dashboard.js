import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";
import TopNav from '../components/Navigation/TopNav';
import SideNav from '../components/Navigation/SideNav';
import LoadingIndicator from '../utils/LoadingIndicator';

const AdminDashboard = () => {
  const nav = useNavigate();
  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType');
  const userId = localStorage.getItem('userId');
  const [submittedCases, setSubmittedCases] = useState([]);
  const [isApiLoading, setApiLoading] = useState([false]);
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const loadSubmittedCases = async(e) => { 
    try{
      await timeout(1000);
      await axios.get(configData.SERVER_URL+"admin/submitted/cases",{
        headers:{
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(res => {
        console.log(res.data);
        setSubmittedCases(res.data);
      });
      setApiLoading(true);
    } catch(e) {
      console.log(e);
    }
   
  }


  useEffect(() => {
    if(userType === configData.USER_TYPE.REGULAR_USER || userType === configData.USER_TYPE.ANONYMOUS_USER){
      nav('/user/dashboard');
    } 
    loadSubmittedCases();
    setApiLoading(false);
    },[]);

  return (
    <div> 
      Admin Dashboard 
      <TopNav/>
      <SideNav userType={localStorage.getItem('userType')}/>
      <main>
        <div class="main-content-admin flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
            <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                <h1 class="font-bold pl-2">Submitted Cases </h1>
            </div>
          </div>

          <div class="mx-2">
            { isApiLoading ? (
              submittedCases.length === 0 ? (" There are no cases reported yet."): 
              submittedCases.map(function(item, i){
                return (<div class=" container lg:w-9/12  justify-center mt-3 ">
                  <div class="block p-6 rounded-lg shadow-lg bg-white max-w-full">
                    <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Case Id: {item.id}</h5>
                    <p class="text-gray-700 text-base">Reporter Type: {item.reporter_type}</p>
                    <p class="text-gray-700 text-base">Reporting For: {item.reporting_for}</p>
                    <p class="text-gray-700 text-base">Phone Number: {item.contact_phone}</p>
                    <p class="text-gray-700 text-base mb-4">Date of incident: {item.date_of_incident}</p>
                    <a type="button" href={`/admin/triage/case/${item.id}`} class=" inline-block px-6 py-1.5 bg-blue-600 text-white font-medium text-xs 
                    rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                    transition duration-150 ease-in-out">Case details</a>
                  </div>
              </div>);
              })
            ) : <LoadingIndicator/> }
          
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard