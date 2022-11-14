import React, {useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";
import TopNav from '../components/Navigation/TopNav';
import SideNav from '../components/Navigation/SideNav';
import LoadingIndicator from '../utils/LoadingIndicator';
import CommentTimeline from './Comment/CommentTimeline';

const CaseDetails = () => {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [caseDetails, setCaseDetails] = useState([]);
  const [caseAttachments, setCaseAttachments] = useState([]);
  const [caseComments, setCaseComments] = useState([]);

  const [isApiLoading, setApiLoading] = useState([false]);
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const loadCaseDetails = async(e) => { 
    try
    {
      await timeout(1000);
      await axios.get(configData.SERVER_URL+"case/"+id,{
        headers:{
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(res => {
        console.log(res.data.attachments);
        setCaseDetails(res.data.case);
        setCaseAttachments(res.data.attachments);
      })
      setApiLoading(true);
    } catch(e) {
      console.log(e)
    }
  
  }

  const loadCaseComments = async (e) => {
    try{
       await timeout(1000);
       await axios.get(configData.SERVER_URL+"user/case/comments/"+id,{
          headers:{
            'Authorization' : 'Bearer ' + token
          }
        })
        .then(res => {
          console.log(res.data); 
          setCaseComments(res.data.comments);     
        })
      } catch(e) {
        console.log()
      }
  }

  useEffect(() => {
    loadCaseDetails();
    loadCaseComments();
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
                {isApiLoading ? (
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
                  
                  { caseDetails.contact_email && 
                  <p class="text-gray-700 text-base"><strong> Contact Last Name: </strong> {caseDetails.contact_email}</p>
                  }
                  <p class="text-gray-700 text-base mb-4"><strong>Date of incident: </strong> {caseDetails.date_of_incident}</p>
                 
                 <p><strong> Attachments </strong>
                  { caseAttachments.length !== 0 ?
                     (caseAttachments.map(function (file, index){
                       return(<p> <a href="/uploads/"> {file.file_name}  </a> </p>);
                    })) : <h3> No attachments were submitted </h3>
                  }
                  </p>
                </div>
                ) : <LoadingIndicator/>}
             

              </div>
            </div>

            <CommentTimeline caseComments={caseComments} />
        </div>
    </main>
    </>
  )
}

export default CaseDetails