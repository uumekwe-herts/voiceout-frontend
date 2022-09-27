import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../../config.json";
import SideNav from '../Navigation/SideNav';
import TopNav from '../Navigation/TopNav';
import DatePicker from "react-datepicker";
import moment from "moment";

const Regular = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <> 
     <TopNav/>
     <SideNav userType={localStorage.getItem('userType')}/>
     <main>
      <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
        <div class="bg-gray-800 pt-3">
            <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                <h1 class="font-bold pl-2">Report a case  </h1>
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
                <label for="" class="form-label inline-block mb-2 text-gray-700">Contact First Name</label>
                <input type="text" class="form-control block w-full px-4 py-2 font-normal text-gray-700 
                    bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name="contactFirstName"
                    value={values.contactFirstName}
                    onChange={handleChange} 
                />
                  {errors.contactFirstName && <p class="text-red-600 text-xs"> {errors.contactFirstName} </p>}
            </div>
            <div class="form-group mb-6 mt-3">
                <label for="" class="form-label inline-block mb-2 text-gray-700">Contact Last Name</label>
                <input type="text" class="form-control block w-full px-4 py-2 font-normal text-gray-700 
                    bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                    ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name="contactFirstName"
                    value={values.contactLastName}
                    onChange={handleChange} 
                />
                  {errors.contactLastName && <p class="text-red-600 text-xs"> {errors.contactFirstName} </p>}
            </div>
          </form>
        </div>
      </div>
     </main>
    </>
  )
}

export default Regular