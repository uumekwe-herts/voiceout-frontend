import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { removeUserSession } from '../../utils/Common';
const TopNav = () => {
    const nav = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        removeUserSession();
        nav("/")
    };
  return (
    <div>
     <a href="" onClick={handleLogout}>Logout </a>  
    </div>
  )
}

export default TopNav