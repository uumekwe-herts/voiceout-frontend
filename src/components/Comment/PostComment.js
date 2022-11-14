import React, {useState, useEffect } from 'react'
import axios from "axios";
import configData from "../../config.json";
import { format, compareAsc } from 'date-fns';
import parseISO from 'date-fns/parseISO';

const PostComment = ({caseId}) => {  
  const token = localStorage.getItem('token');
  const [caseComment, setCaseComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentsTimeline, setCommentTimeline] = useState([]);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const loadCaseComments = async (e) => {
    try{
        await timeout(1000);
       await axios.get(configData.SERVER_URL+"admin/case/comments/"+caseId,{
          headers:{
            'Authorization' : 'Bearer ' + token
          }
        })
        .then(res => {
          console.log(res.data); 
          setCommentTimeline(res.data.comments);     
        })
      } catch(e) {
        console.log()
      }
  }

  const submitComment = (e) => {
    e.preventDefault();
     setIsLoading(true);
     console.log(isLoading);
    axios.post(configData.SERVER_URL+"admin/case/submitComment",{
        'case_id': caseId,
        'comments' : caseComment
    },
    {
        headers:{'Authorization' : 'Bearer ' + token}
    })
    .then(res => {
        console.log(res)
        loadCaseComments();
        setIsLoading(false);
    })
    .catch(error=>{
        console.log(error);
        setIsLoading(false);
      });
      setCaseComment("");
  }
    const handleCommentChange = (e) => {
        setCaseComment(e.target.value)
    }

    useEffect(() => {
        loadCaseComments();
    },[]);

  return (
    <>
    <div class="shadow-md">
        <form onSubmit={submitComment} class="w-full p-4">
        <label class="block mb-2">
            <span class="text-gray-600">Submit an update </span>
            </label>
            <textarea value={caseComment}
            onChange={handleCommentChange} 
            class="block w-full mt-1 rounded border 
            border-solid border-blue-300" rows="3"></textarea>
            { isLoading === false ? 
            (<button type="submit"
                    class="inline-block px-7 mt-3 py-2 bg-blue-600 text-white font-medium 
                    text-sm leading-snug rounded shadow-md hover:bg-blue-700 
                    hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none 
                    focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Submit
                </button>) :   
                <button type="button" disabled
                class="inline-flex w-auto cursor-pointer mt-3 select-none appearance-none items-center justify-center space-x-2 rounded border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-800 hover:bg-blue-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75">
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
      
        </form>
  </div>

    <div class="mt-10">
        <ol class="relative border-l border-gray-200 dark:border-gray-700">   
            { commentsTimeline.length === 0 ? ("No updates posted"): 
                commentsTimeline.map(function(item, i){
                    return(
                    <li class="mb-10 ml-6">            
                        <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <svg aria-hidden="true" class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        </span>
                        <p class="mb-4 text-base font-normal 
                        text-gray-500 dark:text-gray-400"> {item.comments}</p>
                        <time class="block mb-2 text-sm font-normal 
                        leading-none text-black-400 dark:text-gray-500">Posted on {format(parseISO(item.created_at), "MMM-do-yyyy HH:mm")}</time>
                    </li>
                    )
                })
            }
        </ol>
    </div>
</>
  )
}

export default PostComment