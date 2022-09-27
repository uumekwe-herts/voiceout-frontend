import React, {useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";
import TopNav from '../components/Navigation/TopNav';
import SideNav from '../components/Navigation/SideNav';

const CaseDetails = () => {
  return (
    <>
    <TopNav/>
    <SideNav userType={localStorage.getItem('userType')}/>
    <main>
        <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h1 class="font-bold pl-2">Case Details </h1>
                </div>
            </div>

            <div class="mx-2">
                
            </div>
        </div>
    </main>
    </>
  )
}

export default CaseDetails