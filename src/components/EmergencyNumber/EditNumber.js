import React, {useState, useEffect} from 'react';
import axios from "axios";
import TopNav from '../../components/Navigation/TopNav';
import { useNavigate, useParams } from "react-router-dom";
import SideNav from '../../components/Navigation/SideNav';
import configData from "../../config.json";
import editNumberValidation from '../editNumberValidation';
import LoadingIndicator from '../../utils/LoadingIndicator';

const EditNumber = () => {
    const token = localStorage.getItem('token');
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const [agency, setAgency] = useState([]);
    const [agencyPhone, setAgencyPhone] = useState([]);
   
    const [isLoading, setIsLoading] = useState(false);
    const [isApiLoading, setApiLoading] = useState([false]);
    
    const nav = useNavigate();

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
    const loadNumberDetails = async(e) => {
        try
        {
          await timeout(1000);
          await axios.get(configData.SERVER_URL+"admin/emergencyNumber/"+id,{
            headers:{
              'Authorization' : 'Bearer ' + token
            }
          })
          .then(res => {
            setAgency(res.data.number.agency);
            setAgencyPhone(res.data.number.phone_numbers);
          })
          setApiLoading(true);
        } catch(e) {
         
        }
    }

   
    const handleSubmit = (e) => {
         e.preventDefault();
         setErrors(editNumberValidation(agency, agencyPhone));
        setIsLoading(true);
        axios.post(configData.SERVER_URL+"admin/emergencyNumber/edit",{
            'id': id,
            'agency': agency,
            'phone_numbers': agencyPhone
         },
         {
            headers:{'Authorization' : 'Bearer ' + token}
        })
         .then(res => {
            setIsLoading(false);
            nav('/general/emergencynumbers');
         })
         .catch(error => {
            setIsLoading(false);
         })
    }

    useEffect(() => {
        loadNumberDetails();
        setApiLoading(false);
      },[]);
  return (
    <>
        <TopNav/>
        <SideNav userType={localStorage.getItem('userType')}/>
        <main>
            <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                <div class="bg-gray-800 pt-3">
                    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                        <h1 class="font-bold pl-2">Edit Emergency Number </h1>
                    </div>
                </div>

                <div class="mx-2">
                    <div class="container lg:w-9/12  justify-center mt-3 ">
                        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-full">
                            { isApiLoading ? (
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label class="block mb-2 text-gray-600">Agency </label>
                                    <input type="text" 
                                    name="agency"
                                    value={agency}
                                    onChange={(e) => setAgency(e.target.value)} 
                                    class="form-control block bg-clip-padding w-full px-4 py-1
                                        border border-solid focus:bg-white focus:border-blue-600 focus:outline-none" />
                                    {errors.agency && <p class="text-red-600 text-xs"> {errors.agency} </p>}
                                </div>
                                <div class="form-group mt-3">
                                    <label class="block mb-2 text-gray-600">Phone Numbers </label>
                                    <textarea value={agencyPhone} 
                                    name="phoneNumbers"
                                    onChange={(e) => setAgencyPhone(e.target.value)} 
                                    class="form-control block bg-clip-padding w-full
                                    border border-solid focus:bg-white focus:border-blue-600 focus:outline-none"></textarea>
                                    {errors.phoneNumbers && <p class="text-red-600 text-xs"> {errors.phoneNumbers} </p>}
                                </div>
                                { isLoading === false ? 
                                    (<button type="submit"
                                        class="inline-block mt-5 px-7 py-2 bg-blue-600 text-white font-medium 
                                        text-sm leading-snug rounded shadow-md hover:bg-blue-700 
                                        hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none 
                                        focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Submit
                                    </button>) : 
                                    
                                    <button
                                    type="button" disabled
                                    class="inline-flex w-auto cursor-pointer mt-5 select-none appearance-none items-center justify-center space-x-2 rounded border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-800 hover:bg-blue-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75">
                                    <svg class="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                                        <path
                                        class="fill-blue-800"
                                        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                                        <path
                                        class="fill-blue-100"
                                        d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                                    </svg>
                                    <span>Please wait...</span>
                                    </button>
                                }
                            </form>
                            ): <LoadingIndicator/> }
                      
                        </div>
                    </div>
                </div>
            </div>   
        </main>
    </>
  )
}

export default EditNumber