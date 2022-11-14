import React, { useEffect, useState } from 'react'
import axios from "axios";
import TopNav from '../../components/Navigation/TopNav';
import SideNav from '../../components/Navigation/SideNav';
import configData from "../../config.json";
import LoadingIndicator from '../../utils/LoadingIndicator';

const ListNumbers = () => {
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);
  const [isApiLoading, setApiLoading] = useState([false]);
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const loadEmergencyNumbers = async(e) => { 
    try{
        await timeout(1000);
        await axios.get(configData.SERVER_URL+"emergencyNumbers",{
          headers:{
            'Authorization' : 'Bearer ' + token
          }
        })
        .then(res => {
         setEmergencyNumbers(res.data.numbers);
        });
        setApiLoading(true);
    } catch(e) {
      
    }
   
  }

  useEffect(() => {
    loadEmergencyNumbers();
    setApiLoading(false);
  },[])

  return (
    <>
      <TopNav/>
      <SideNav userType={localStorage.getItem('userType')}/>
      <main>
        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          <div class="bg-gray-800 pt-3">
              <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                  <h1 class="font-bold pl-2"> Emergency Numbers </h1>
              </div>
          </div>
          <div class="mx-2">
          { isApiLoading ? (
              emergencyNumbers.length === 0 ? (" There are no cases reported yet."): 
              emergencyNumbers.map(function(item, i){
                return (<div class=" container lg:w-9/12  justify-center mt-3 ">
                  <div class="block p-6 rounded-lg shadow-lg bg-white max-w-full">
                    <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2"> {item.agency}</h5>
                    <p class="text-gray-700 text-base">Phone Number: {item.phone_numbers}</p>
                    { userType === configData.USER_TYPE.ADMIN && 
                       <a type="button" href={`/admin/emergencynumber/edit/${item.id}`} class=" inline-block px-6 py-1.5 bg-blue-600 text-white font-medium text-xs 
                       rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                       focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                       transition duration-150 ease-in-out">Edit</a>
                    }
                  </div>
              </div>);
              })
            ) : <LoadingIndicator/> }
          </div>
        </div>
      </main>

    </>
  )
}

export default ListNumbers