import React, {useState} from 'react'
import logo from '../images/loudspeaker.svg';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";

const LoginAnon = () => {
  const [anonymousEmail, setAnonymousEmail] = useState([]);
  const [anonymousPassword, setAnonymousPassword] = useState([]);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response = await axios.post(configData.SERVER_URL+"anonymous/login", {
      email : anonymousEmail,
      password : anonymousPassword,
    })
    console.log(response.data)
    const token = response.data.token
    localStorage.setItem('token', token);
    localStorage.setItem('userType', configData.USER_TYPE.ANONYMOUS);
    localStorage.setItem('userId', response.data.user.id);
    setIsLoading(false);
    if(token){
          nav("/user/dashboard")
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
          <p class="font-semibold">Anonymous Login</p>
      </div>
      <div class="">
        <form onSubmit={submit}>
          <div class="form-group mb-6 mt-3">
            <label class="form-label inline-block mb-2 text-gray-700">Enter your anonymous email</label>
            <input type="email" 
              onChange={e => setAnonymousEmail(e.target.value)}
              class="form-control block w-full px-4 py-1 text-xl font-normal 
              text-gray-400 border border-solid border-gray-300 rounded 
              transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 
              focus:outline-none" name="email" required/>
          </div> 
          <div class="form-group mb-6 mt-3">
            <label class="form-label inline-block mb-2 text-gray-700">Enter your 8 digit authentication code</label>
            <input type="password" 
              onChange={e => setAnonymousPassword(e.target.value)}
              class="form-control block w-full px-4 py-1 text-xl font-normal 
              text-gray-400 border border-solid border-gray-300 rounded m-0 focus:text-gray-700  
              focus:border-blue-600 focus:outline-none" 
              name="password" required/>
          </div> 
          <div class="flex justify-between items-center mb-6"> 
            <NavLink  to="/register/anonymous" exact class="mb-4">
                <span class="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out"> Anonymous Registration </span>
            </NavLink>

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
                    <span>Please wait...</span>
                    </button>
                }

          </div>
        </form>
      </div>
    </div> 
   </>
  )
}

export default LoginAnon