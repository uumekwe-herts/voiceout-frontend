import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../../config.json";
import SideNav from '../Navigation/SideNav';
import TopNav from '../Navigation/TopNav';
import DatePicker from "react-datepicker";
import moment from "moment";
import anonymousCaseReportValidation from '../../validation/anonymousCaseReport';

const Anonymous = () => {
    const MAX_FILE_COUNT = 5;
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
    const token = localStorage.getItem('token');

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [dateOfIncident, setDateOfIncident] = useState(null);
    
    const nav = useNavigate();

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if(uploaded.findIndex((f) => f.name === file.name) === -1){
                uploaded.push(file);
                if(uploaded.length === MAX_FILE_COUNT) setFileLimit(true);
                if(uploaded.length > MAX_FILE_COUNT) {
                    alert(`You can only add a maximum of ${MAX_FILE_COUNT}`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if(!limitExceeded) setUploadedFiles(uploaded)
    }

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }

    const [values, setValues] = useState({
        reportingFor: "", 
        phoneNumber: "", 
        age: "",
        category:"",
        caseInformation: "", 
        incidentAddress: "", 
        numberOfVictims: "",
        numberOfViolators:"",
    });

  
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let formatedDateOfIncident = moment(new Date(dateOfIncident)).format('YYYY-MM-DD');
        setErrors(anonymousCaseReportValidation(values, formatedDateOfIncident));
        const config ={
            headers:{
                'Authorization':`Bearer ${token}`,
                 'Content-Type': 'multipart/form-data'
             }, 
        }
        const formData = new FormData();
         formData.append('reporting_for',values.reportingFor)
         formData.append('contact_phone',values.phoneNumber)
         formData.append('age',values.age);
         formData.append('category',values.category);
         formData.append('case_details',values.caseInformation)
         formData.append('incident_address',values.incidentAddress)
         formData.append('number_of_victims',values.numberOfVictims)
         formData.append('number_of_violators', values.numberOfViolators);
         formData.append('date_of_incident', formatedDateOfIncident);
         formData.append('user_id', localStorage.getItem('userId'));
         formData.append('reporter_type', localStorage.getItem('userType'));
        
         uploadedFiles.map((file, index) => {
            formData.append(`attachment[${index}]`, file);
          });
   
          setIsLoading(true);
        axios.post(configData.SERVER_URL+"anonymous/submitcase",formData,config)
        .then(response => {
            console.log(response)
            setIsLoading(false);
            nav("/user/dashboard");
        }).catch(error=>{
            setIsLoading(false);
            console.log(error);
        })

    }

    return (
        <> 
         <TopNav/>
         <SideNav userType={localStorage.getItem('userType')}/>
          <main>
              <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                <div class="bg-gray-800 pt-3">
                    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                        <h1 class="font-bold pl-2">Report a case anonymously </h1>
                    </div>
                </div>
                <div class="mx-2">
                    <form onSubmit={handleSubmit}>
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Reporting for</label>
                            <select value={values.reportingFor} 
                                name="reportingFor" 
                                onChange={handleChange} 
                                class="form-select block w-full px-3 py-1.5 text-base
                                font-normal text-gray-700 border border-solid border-gray-300 
                                rounded m-0 focus:border-blue-600 focus:outline-none">
                                    <option>Select</option>
                                    <option value="self"> Myself</option>
                                    <option value="Someone else"> Someone else </option>
                            </select>
                            {errors.reportingFor && <p class="text-red-600 text-xs"> {errors.reportingFor} </p>}
                        </div>
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Phone Number</label>
                            <input type="text" class="form-control block w-full px-4 py-2 font-normal text-gray-700 
                                bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={handleChange} 
                            />
                             {errors.phoneNumber && <p class="text-red-600 text-xs"> {errors.phoneNumber} </p>}
                        </div>
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Age</label>
                            <input type="text" class="form-control block w-full px-4 py-2 font-normal text-gray-700 
                                bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="age"
                                value={values.age}
                                onChange={handleChange} 
                            />
                             {errors.age && <p class="text-red-600 text-xs"> {errors.age} </p>}
                        </div>
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Category</label>
                            <select 
                                value={values.category}
                                onChange={handleChange} 
                                name="category" 
                                class="form-select block w-full px-3 py-1.5 text-base
                                font-normal text-gray-700 border border-solid border-gray-300 
                                rounded m-0 focus:border-blue-600 focus:outline-none">
                                    <option>Select</option>
                                    <option value="Rape"> Rape</option>
                                    <option value="Assault"> Assault </option>
                                    <option value="Domestic_Violence"> Domestic Violence </option>
                                    <option value="Sexual_Harrassment"> Sexual Harrassment </option>
                            </select>
                            {errors.category && <p class="text-red-600 text-xs"> {errors.category} </p>}
                        </div>
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Date of Incident</label>
                            <div class="border">
                                <DatePicker selected={dateOfIncident} dateFormat='dd/MM/yyyy' isClearable
                                onChange={date => setDateOfIncident(date)}/>
                                {errors.dateOfIncident && <p class="text-red-600 text-xs"> {errors.dateOfIncident} </p>}  
                            </div>
                        </div>
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Give us more information about the incident</label>
                           <textarea rows="10" 
                             value={values.caseInformation}
                             onChange={handleChange} 
                           class="form-control block w-full bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                            name="caseInformation"></textarea>
                            {errors.caseInformation && <p class="text-red-600 text-xs"> {errors.caseInformation} </p>}
                        </div>
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Give us the full address where the incident occurred</label>
                           <textarea rows="3" 
                            value={values.incidentAddress}
                            onChange={handleChange} 
                           class="form-control block w-full bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="incidentAddress"> </textarea>
                        </div>
                        {errors.incidentAddress && <p class="text-red-600 text-xs"> {errors.incidentAddress} </p>}
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Number of victims</label>
                            <input type="text" 
                             value={values.numberOfVictims}
                             onChange={handleChange} 
                            class="form-control block w-full px-4 py-2 font-normal text-gray-700 
                                bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="numberOfVictims"
                            />
                           {errors.numberOfVictims && <p class="text-red-600 text-xs"> {errors.numberOfVictims} </p>} 
                        </div>
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Number of alleged violators</label>
                            <input type="text" 
                             value={values.numberOfViolators}
                             onChange={handleChange} 
                            className="form-control block w-full px-4 py-2 font-normal text-gray-700 
                                bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="numberOfViolators"
                            />
                             {errors.numberOfViolators && <p class="text-red-600 text-xs"> {errors.numberOfViolators} </p>} 
                        </div>
                        <div class="form-group mb-6 mt-3">
                            <label for="" class="form-label inline-block mb-2 text-gray-700">Attach evidence</label>
                            <input type="file" multiple class="form-control block w-full px-4 py-2 font-normal text-gray-700 
                                bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="attachment" id="file_input"
                                onChange={handleFileEvent}
                                disabled={fileLimit}
                            />
                            <div className="">
                                {uploadedFiles.map(file => (
                                    <div>{file.name}</div>
                                ))}
                            </div>
                        </div>
                        <div class="form-group mb-6 mt-3">
                        { isLoading === false ? 
                        (<button type="submit"
                            class="inline-block px-7 py-2 bg-blue-600 text-white font-medium 
                            text-sm leading-snug rounded shadow-md hover:bg-blue-700 
                            hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none 
                            focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Submit
                        </button>) : 
                           
                        <button
                        type="button" disabled
                        class="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-2 rounded border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-800 hover:bg-blue-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75">
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
                        </div>
                    </form>
                </div>
              </div>
          </main>
        </>
      )
}

export default Anonymous