import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../images/loudspeaker.svg';
import { removeUserSession } from '../../utils/Common';
const TopNav = () => {
    const nav = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        removeUserSession();
        nav("/")
    };
  return (
    <>
    <header>
      <nav aria-label="menu nav" class="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
        <div class="flex flex-wrap items-center">
          <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
            <NavLink to="/user/dashboard"> <img src={logo} class="w-9" alt=""/> </NavLink><span class="text-sm inline-block pl-2 py-2">Voiceout</span>
          </div>
          <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
            <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li class="flex-1 md:flex-none md:mr-3">
                <a class="inline-block py-2 px-4 text-white no-underline"onClick={handleLogout} href="">Logout</a>
              </li>
            </ul>
          </div>
        </div>  
     
      </nav>
    </header>
 
    </>
  )
}

export default TopNav