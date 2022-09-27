import React, { useEffect, useState } from 'react';
import logo from '../images/loudspeaker.svg';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import configData from "../config.json";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import userValidation from '../components/userValidation';

function Register() {
  const [ngStates, setNgStates] = useState([]);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function getNgStates () {
      const ngStatesData = await axios.get(configData.SERVER_URL+"ngstates");
      const ngStatesResult = []
      console.log(ngStatesData.data);
      ngStatesData.data.forEach((ngState) => {
        ngStatesResult.push({
          key: ngState._id,
          value: ngState.name,
          text: ngState.name
        });

        setNgStates([
          {key: "Select State", value: "", text: "Select State"}, 
          ...ngStatesResult
        ]);
      })
    }
    getNgStates();
  }, [])

  const [dateOfBirth, setDateOfBirth] = useState(null);

  const [values, setValues ]= useState({
    firstName:"", lastName:"", email:"", password:"", phone:"", 
    regState:"", gender:"", confirmPassword:"", dateOfBirth:""
  });

  const handleChange = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formatedDob = moment(new Date(dateOfBirth)).format('YYYY-MM-DD')
    setErrors(userValidation(values, dateOfBirth));
    setIsLoading(true);

    let userRegistration = await axios.post(configData.SERVER_URL+"user/register", {
      first_name : values.firstName,
      last_name : values.lastName,
      email : values.email,
      password : values.password,
      phone : values.phone,
      date_of_birth : formatedDob,
      state : values.regState,
      gender : values.gender,
    });

    
    console.log(userRegistration.data.user)

    if(userRegistration.data.user){
       let userlogin  = await axios.post(configData.SERVER_URL+"user/login", {
              email: userRegistration.data.user.email,
              password: values.password
        }, 
        {
          headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
        console.log(userlogin.data)
        const token = userlogin.data.token
        localStorage.setItem('token', token);
        localStorage.setItem('userType', configData.USER_TYPE.REGULAR);
        localStorage.setItem('userId', userRegistration.data.user.id);

        if(token){
          nav("/user/dashboard")
        }
    }
    else {
      setIsLoading(false);
    }

  }




  return (
 
    <div>
      <div class="flex flex-row ...">
        <div class="ml-4"> 
            <NavLink  to="/"> <img src={logo} class="w-24" alt=""/> </NavLink>
        </div>
        <div class="ml-4 mt-8">
            <h4 class="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600">VoiceOut </h4>
        </div>
      </div>

      <div class="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-lg">
        <div class="px-6 h-full text-center text-gray-800">
          <p class="font-semibold"> Registration</p>
        </div>
        <div class="">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div class="form-group mb-6 mt-3">
              <label for="" class="form-label inline-block mb-2 text-gray-700">First Name</label>
              <input name="firstName" type="text" class="form-control block w-full px-4 py-1
                     font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded m-0 focus:text-gray-700 
                    focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={values.firstName}
                    onChange={handleChange}/>
              {errors.firstName && <p class="text-red-600 text-xs"> {errors.firstName} </p>}
            </div>
            <div class="form-group mb-6 mt-3">
              <label for="" class="form-label inline-block mb-2 text-gray-700">Last Name</label>
              <input name="lastName" type="text" class="form-control block w-full px-4 py-1
                     font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded m-0 focus:text-gray-700 
                    focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={values.lastName}
                    onChange={handleChange}/>
               {errors.lastName && <p class="text-red-600 text-xs"> {errors.lastName} </p>}      
            </div>
            <div class="form-group mb-6 mt-3">
              <label for="" class="form-label inline-block mb-2 text-gray-700">Email</label>
              <input name="email" type="text" class="form-control block w-full px-4 py-1
                     font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded m-0 focus:text-gray-700 
                   focus:border-blue-600 focus:outline-none" autocomplete="false"
                    value={values.email}
                    onChange={handleChange}/>
               {errors.email && <p class="text-red-600 text-xs"> {errors.email} </p>}      
            </div>
            <div class="form-group mb-6 mt-3">
              <label for="" class="form-label inline-block mb-2 text-gray-700">Password</label>
              <input name="password" type="password" class="form-control block w-full px-4 py-1
                     font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded m-0 focus:text-gray-700 
                    focus:bg-white focus:border-blue-600 focus:outline-none" autoComplete="off"
                    value={values.password}
                    onChange={handleChange}/>
                {errors.password && <p class="text-red-600 text-xs"> {errors.password} </p>}    
            </div>
            <div class="form-group mb-6 mt-3">
              <label for="" class="form-label inline-block mb-2 text-gray-700">Confirm Password</label>
              <input name="confirmPassword" type="password" class="form-control block w-full px-4 py-1
                     font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded m-0 focus:text-gray-700 
                    focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={values.confirmPassword}
                    onChange={handleChange}/>
               {errors.confirmPassword && <p class="text-red-600 text-xs"> {errors.confirmPassword} </p>}      
            </div>
            <div class="form-group mb-6 mt-3">
              <label for="" class="form-label inline-block mb-2 text-gray-700">Phone Number</label>
              <input name="phone" type="text" class="form-control block w-full px-4 py-1
                     font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 
                    focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={values.phone}
                    onChange={handleChange}/>
              {errors.phone && <p class="text-red-600 text-xs"> {errors.phone} </p>}        
            </div>
            <div class="form-group mb-6 mt-3">
            <label for="" class="form-label inline-block mb-2 text-gray-700">Date of birth</label>
              <div class="border">
                <DatePicker selected={dateOfBirth} dateFormat='dd/MM/yyyy' isClearable
                   onChange={date => setDateOfBirth(date)}/>
                   {errors.dateOfBirth && <p class="text-red-600 text-xs"> {errors.dateOfBirth} </p>}  
              </div>
            </div>
            <div class="form-group mb-6 mt-3">
              <label for="" class="form-label inline-block mb-2 text-gray-700">State</label>
              <select  
                    name="regState"
                    value={values.regState}
                    onChange={handleChange} 
                    class="form-select block w-full px-3 py-1.5 text-base
                    font-normal text-gray-700 border border-solid border-gray-300 
                    rounded m-0 focus:border-blue-600 focus:outline-none">
                   {ngStates.map((state) => {
                      return (
                        <option key={state.key} value={state.value}> {state.text} </option>
                      )
                    })}
                </select>
                {errors.regState && <p class="text-red-600 text-xs"> {errors.regState} </p>}  
            </div>
            <div class="form-group mb-6 mt-3">
              <label for="" class="form-label inline-block mb-2 text-gray-700">Gender</label>
              <select  
                    onChange={handleChange} 
                    name="gender" 
                    class="form-select block w-full px-3 py-1.5 text-base
                    font-normal text-gray-700 border border-solid border-gray-300 
                    rounded m-0 focus:border-blue-600 focus:outline-none">
                    <option value="">--Select--</option>
                    <option value="Male"> Male </option>
                    <option value="Female"> Female </option>
                </select>
                {errors.gender && <p class="text-red-600 text-xs"> {errors.gender} </p>}   
            </div>

            <div class="flex justify-between items-center mb-6"> 

            { isLoading === false ? 
                    (
                        <button type="submit" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs 
                        leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                        transition duration-150 ease-in-out">Submit</button>
                    ):
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
                    <span>Processing...</span>
                    </button>
                }
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Register