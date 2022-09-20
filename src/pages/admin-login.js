import React, {useState} from 'react'
import logo from '../images/loudspeaker.svg';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";


const AdminLogin = () => {

    const [adminEmail, setAdminEmail] = useState([]);
    const [adminPassword, setAdminPassword] = useState([]);

    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        let response = await axios.post(configData.SERVER_URL+"admin/login", {
          email : adminEmail,
          password : adminPassword,
        })
        console.log(response.data)
        const token = response.data.token
        localStorage.setItem('token', token);
        localStorage.setItem('userType', configData.ADMIN_USER);
        
        if(token){
              nav("/admin/dashboard")
         } 
      }

    return (
        <>
    <div class="flex flex-row ...">
      <div class="ml-4"> 
          <NavLink  to="/">  <img src={logo} class="w-24" alt=""/>  </NavLink>
      </div>
      <div class="ml-4 mt-8">
          <h4 class="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600">VoiceOut </h4>
      </div>
    </div>
    <div class="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-lg">
      <div class="px-6 h-full text-center text-gray-800">
          <p class="font-semibold">Admin Login</p>
      </div>
      <div class="">
        <form onSubmit={submit}>
          <div class="form-group mb-6 mt-3">
            <label class="form-label inline-block mb-2 text-gray-700">Enter admin email</label>
            <input type="email" 
              onChange={e => setAdminEmail(e.target.value)}
              class="form-control block w-full px-4 py-1 text-xl font-normal 
              text-gray-700 border border-solid border-gray-300 rounded 
              transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 
              focus:outline-none" name="email" required/>
          </div> 
          <div class="form-group mb-6 mt-3">
            <label class="form-label inline-block mb-2 text-gray-700">Enter admin password</label>
            <input type="password" 
              onChange={e => setAdminPassword(e.target.value)}
              class="form-control block w-full px-4 py-1 text-xl font-normal 
              text-gray-700 border border-solid border-gray-300 rounded m-0 focus:text-gray-700  
              focus:border-blue-600 focus:outline-none" 
              name="password" required/>
          </div> 
          <div class="flex justify-between items-center mb-6"> 
            <button type="submit" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs 
                leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                focus:bg-blue-700 focus:shadow-lg focus:outline-none 
                focus:ring-0 active:bg-blue-800 active:shadow-lg 
                duration-150 ease-in-out">Submit</button>
          </div>
        </form>
      </div>
    </div> 
        </>
    )
}

export default AdminLogin