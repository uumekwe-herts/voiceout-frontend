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
        if(token){
          nav("/user/dashboard")
        }
    }

    // .then((response) => {
    //     console.log(response.data)
    //     if(response.data.user){
    //       axios.post(configData.SERVER_URL+"user/login", {
    //         email: response.data.user.email,
    //         password: response.data.user.password
    //       })
    //     }
    // });

  }


const [errors, setErrors] = useState({});

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
              <button type="submit" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs 
                leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                transition duration-150 ease-in-out">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Register