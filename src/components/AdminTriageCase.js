import React, {useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";
import TopNav from '../components/Navigation/TopNav';
import SideNav from '../components/Navigation/SideNav';
import LoadingIndicator from '../utils/LoadingIndicator';
import PostComment from './Comment/PostComment';

const AdminTriageCase = () => {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [caseDetails, setCaseDetails] = useState([]);
  const [caseAttachments, setCaseAttachments] = useState([]);
  const [isApiLoading, setApiLoading] = useState([false]);
  const [isLoading, setIsLoading] = useState(false);

  const [caseStatus, setCaseStatus] = useState([]);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
 
  const loadCaseDetails = async(e) => { 
    try{
      await timeout(1000);
      let response = await axios.get(configData.SERVER_URL+"case/"+id,{
        headers:{
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(res => {
        console.log(res.data);
        setCaseDetails(res.data.case);
        setCaseAttachments(res.data.attachments);
         
      })
     // console.log(response.data.attachments);
   setApiLoading(true);
    } catch(e) {
      console.log()
    }
  }

  const statusChange = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(configData.SERVER_URL+"admin/case/updateStatus",{
      'case_id' : caseDetails.id,
      'status' : caseStatus
    },
    {
      headers:{
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(res => {
      console.log(res);
      loadCaseDetails();
    })
    .catch(error=>{
      console.log(error);
    });
    
  }
  const handleStatusChange = (e) => {
    setCaseStatus(e.target.value)
    console.log(e.target.value);
}

  useEffect(() => {
    loadCaseDetails();
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
                    <h1 class="font-bold pl-2">Case Details </h1>
                </div>
               
            </div>

            <div class="mx-2">
              <div class="container lg:w-9/12  justify-center mt-3 ">
                { isApiLoading ? (      
                
                <>
                <div class="block p-6 rounded-lg shadow-lg bg-white max-w-full">
                
                  <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Case Id: {caseDetails.id}</h5>
                  { caseDetails.contact_first_name && 
                  <p class="text-gray-700 text-base"> <strong> Contact First Name: </strong> {caseDetails.contact_first_name}</p>
                  }
                  { caseDetails.contact_last_name && 
                  <p class="text-gray-700 text-base"><strong> Contact Last Name:</strong> {caseDetails.contact_last_name}</p>
                  }
                  <p class="text-gray-700 text-base"><strong>Reporter type:</strong> {caseDetails.reporter_type }</p>
                  <p class="text-gray-700 text-base"><strong> Report Category:</strong>  {caseDetails.category}</p>
                  <p class="text-gray-700 text-base"><strong> Reporting For: </strong>{caseDetails.reporting_for}</p>
                  <p class="text-gray-700 text-base"><strong> Reporter Age: </strong> {caseDetails.age}</p>
                  <p class="text-gray-700 text-base"><strong> Number of victims: </strong>{caseDetails.number_of_victims}</p>
                  <p class="text-gray-700 text-base"><strong> Number of violators: </strong> {caseDetails.number_of_violators}</p>
                  <p class="text-gray-700 text-base"><strong>Contact Phone:  </strong>{caseDetails.contact_phone}</p>
                  <p class="text-gray-700 text-base"><strong> Incident Address:  </strong>{caseDetails.incident_address}</p>
                  <p class="text-gray-700 text-base"><strong> Case details:</strong>  {caseDetails.case_details}</p>
                  <p class="text-gray-700 text-base"><strong>  Status: </strong> 
                  {
                   caseDetails.status === 'Pending' &&  
                   <button type="button" class="inline-block px-6 py-0.5 bg-yellow-500 text-white 
                   font-small text-xs leading-tight uppercase rounded-full shadow-md 
                   hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg 
                   focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg 
                   transition duration-150 ease-in-out">Pending</button>
                   } 
                  {
                   caseDetails.status === 'Under Investigation' &&  
                   <button 
                   type="button" class="inline-block px-6 py-0.5 bg-green-500 text-white 
                   font-small text-xs leading-tight uppercase rounded-full shadow-md 
                   hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg 
                   focus:ring-0 active:bg-green-700 active:shadow-lg 
                   transition duration-150 ease-in-out">Under Investigation</button>
                   } 
                   {
                   caseDetails.status === 'Closed' &&  
                   <button type="button" class="inline-block px-6 py-0.5 bg-red-500 text-white 
                   font-small text-xs leading-tight uppercase rounded-full shadow-md 
                   hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg 
                    focus:ring-0 active:bg-red-700 active:shadow-lg 
                   transition duration-150 ease-in-out">Closed</button>
                   } 
                   </p> 
                  
                  { caseDetails.contact_email && 
                  <p class="text-gray-700 text-base"><strong> Contact Last Name: </strong> {caseDetails.contact_email}</p>
                  }
                  <p class="text-gray-700 text-base mb-4"><strong>Date of incident: </strong> {caseDetails.date_of_incident}</p>
                 
                 <p><strong> Attachments </strong>
                  { caseAttachments.length !== 0 ?
                     (caseAttachments.map(function (file, index){
                       return(<p class="text-blue-600 underline"> <a href={configData.SERVER_URL+"admin/download/caseAttachment/"+file.file_name}> {file.file_name}  </a> </p>);
                    })) : <h3> No attachments were submitted </h3>
                  }
                  </p>

                  <div class="form-group mb-6 mt-3">
                 
                  {

                   caseDetails.status === 'Pending' &&  
                   <>
                    <form onSubmit={statusChange}>
                    <select
                      value={caseStatus}
                      name="pendingOptions"
                      onChange={handleStatusChange} 
                      class="form-select block w-full
                      border border-solid border-blue-300">
                        <option>--Update Case Status--</option>
                         <option value="Under Investigation"> 
                          Under Investigation 
                         </option>
                         <option value="Closed">
                            Closed
                         </option> 
                      </select>
                     
                       <button 
                      
                       type="submit" class="inline-block px-6 py-1.5 mt-3
                       bg-blue-600 text-white font-medium text-xs 
                       leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                       focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                       transition duration-150 ease-in-out">Submit</button>
                    </form>
                       </>
                   }
                   {
                     caseDetails.status === 'Under Investigation' &&  
                     
                     <form onSubmit={statusChange}>
                        <select 
                          name="underinvoptions"
                          onChange={handleStatusChange} 
                          class="form-select block w-full
                          border border-solid border-blue-300">
                            <option>--Update Case Status--</option>
                          <option value="Closed">
                            Closed
                          </option> 
                          <option value="Pending"> 
                          Pending
                          </option>
                        </select>
                        <button 
                        disabled={isLoading} 
                        type="submit" class="inline-block px-6 py-1.5 mt-3
                        bg-blue-600 text-white font-medium text-xs 
                        leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                        transition duration-150 ease-in-out">Submit</button>
                     </form>
                   }
                  
                  </div>
                </div>
                
                <div class="block p-6 rounded-lg mt-5 shadow-lg bg-white max-w-full">
                <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Case Updates</h5>
                <PostComment caseId={caseDetails.id}/>
                </div>
                </>
                ) : <LoadingIndicator/> }
          
              </div>
            </div>

        </div>
    </main>
    </>
  )
}

export default AdminTriageCase