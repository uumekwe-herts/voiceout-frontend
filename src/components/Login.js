import React, {useState} from 'react'
import logo from '../images/loudspeaker.svg';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";

const Login = () => {
  const [userEmail, setUserEmail] = useState([]);
  const [userPassword, setUserPassword] = useState([]);

  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    let response = await axios.post(configData.SERVER_URL+"user/login", {
      email : userEmail,
      password : userPassword,
    },  
    {
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    console.log(response.data)
    const token = response.data.token
    localStorage.setItem('token', token);
    localStorage.setItem('userType', 'regularUser');
    if(token){
          nav("/user/dashboard")
     } 
  }

  return (
    <section class="h-screen">
    <div class="px-6 h-full text-gray-800">
      <div class="flex xl:justify-center lg:justify-between justify-center 
            items-center flex-wrap h-full g-6">
        <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 
            lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
          <img src={logo} class="w-full" alt=""/>
        </div>
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form onSubmit={submit}>
            <div class="flex flex-row items-center justify-center lg:justify-start">
              <p class="text-lg mb-0 mr-4">Sign in to VOICEOUT</p>
            </div>
  
            <div class="mb-6">
              <input type="email"
                onChange={e => setUserEmail(e.target.value)}
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 
                  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                name="email" placeholder="Email address"
              />
            </div>
  
            <div class="mb-6">
              <input type="password"
                onChange={e => setUserPassword(e.target.value)}
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                name="password" placeholder="Password"/>
            </div>
  
            <div class="flex justify-between items-center mb-6">
            {/* <a href="#!" class="text-gray-800">Forgot password?</a> */}
            
            <NavLink  to="/register/anonymous" exact>
                Anonymous Registration
            </NavLink>
            <NavLink  to="/login/anonymous" exact>
                Anonymous Login
            </NavLink>
            </div>
  
            <div class="text-center lg:text-left">
              <button type="submit"
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium 
                text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 
                hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none 
                focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Login
              </button>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Don't have an account?
                <NavLink to="/register" exact>
                 <span class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Register</span>
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login