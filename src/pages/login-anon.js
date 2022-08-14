import React from 'react'
import logo from '../images/loudspeaker.svg';
import { NavLink } from "react-router-dom";


const LoginAnon = () => {
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
        <form>
          <div class="form-group mb-6 mt-3">
            <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Enter your 8 digit authentication code</label>
            <input type="text" class="form-control block w-full px-4 py-1 text-xl font-normal 
              text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
              transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id=""/>
          </div> 
          <div class="flex justify-between items-center mb-6"> 
            <NavLink  to="/register-anon" exact class="mb-4">
                <span class="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out"> Anonymous Registration </span>
            </NavLink>
            <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs 
                leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                transition duration-150 ease-in-out">Submit</button>
          </div>
        </form>
      </div>
    </div> 
   </>
  )
}

export default LoginAnon