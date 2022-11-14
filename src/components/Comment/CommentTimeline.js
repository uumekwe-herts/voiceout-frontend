import React, {useState, useEffect } from 'react'
import axios from "axios";
import { format, compareAsc } from 'date-fns';
import parseISO from 'date-fns/parseISO';

const CommentTimeline = ({caseComments}) => {
  return (
    <div class="mx-2 mt-10">
   <div class="container lg:w-9/12 justify-center mt-3 ">
    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-full">
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Case Updates</h5>
            <ol class="relative border-l border-gray-200 dark:border-gray-700">   
                { 
                    caseComments.map(function(item, i){
                        return(
                        <li class="mb-10 ml-6">            
                            <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <svg aria-hidden="true" class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                            </span>
                            <p class="mb-4 text-base font-normal 
                            text-gray-500 dark:text-gray-400"> {item.comments}</p>
                            <time class="block mb-2 text-sm font-normal 
                            leading-none text-black-400 dark:text-gray-500">Posted on {format(parseISO(item.created_at), "do-MMM-yyyy HH:mm")}</time>
                        </li>
                        )
                    })
                }
            </ol>
            </div>
        </div>
    </div>
  )
}

export default CommentTimeline