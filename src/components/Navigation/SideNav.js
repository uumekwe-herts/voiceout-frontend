import React from 'react'
import configData from "../../config.json";


const SideNav = ({userType}) => {
  return (
    <>
            <div class="sidenav bg-gray-800 shadow-xl h-20 fixed 
              bottom-0 mt-12 md:relative md:h-screen z-10 w-full 
              md:w-48 content-center">
                <div class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 
                content-center md:content-start text-left justify-between">
                    <ul class="list-reset flex flex-row md:flex-col 
                    pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                        <li class="mr-3 flex-1">
                          { userType ===  configData.USER_TYPE.ANONYMOUS && ( 
                            <a href="/user/reportcase/anonymous" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                  <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Report a case anonymously</span>
                            </a>
                          )}
                             { userType ===  configData.USER_TYPE.REGULAR && ( 
                            <a href="/user/reportcase" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                  <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Report a case</span>
                            </a>
                          )}
                        </li>
                        <li class="mr-3 flex-1">
                            <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Emergency numbers</span>
                            </a>
                        </li>
                        {(userType ===  configData.USER_TYPE.ANONYMOUS || 
                        userType ===  configData.USER_TYPE.REGULAR) && ( 
                        <li class="mr-3 flex-1">
                            <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">My Cases</span>
                            </a>
                        </li>
                        )}
                        {( userType === configData.USER_TYPE.ADMIN) && (
                           <li class="mr-3 flex-1">
                           <a href="" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                               <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Submitted Cases</span>
                           </a>
                       </li>
                        )}
                        <li class="mr-3 flex-1">
                            <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                <span class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Resource Center</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>    
       
    </>
  )
}

export default SideNav