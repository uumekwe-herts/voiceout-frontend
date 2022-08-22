import React , {useState, useEffect } from 'react'

import logo from '../images/loudspeaker.svg';
import { NavLink } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";

import validation from '../components/validation';


const RegisterAnon = () => {
const [regQuestions, setregQuestions] = useState([]);

useEffect(() => {
    async function fetchquestions() {
        const questionsData =  await axios.get(configData.SERVER_URL+"anon-user/reg-questions");
        const results = [];
        questionsData.data.forEach((question) => {
            results.push({
                key: question._id,
                value: question.title,
                text: question.title
            });
        });
        setregQuestions([
            {key: 'Select a Question', value:'', text: 'Select a Question'},
            ...results
        ])
    }
    fetchquestions();
},[]);

const [values, setValues] = useState({
    question1: "", answer1: "", question2: "",
    answer2: "", question3: "", answer3: ""
});

const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(values));
    axios.post(configData.SERVER_URL+"anonymous/register", {
      question_1 : values.question1,
      answer_1 : values.answer1,
      question_2 : values.question2,
      answer_2 : values.answer2,
      question_3 : values.question3,
      answer_3: values.answer3,
    })
    .then((response) => {
        console.log(response.data)
        if(response.data.auth_code){
            setValues({
                ...values,
               question1:"", answer1:"",question2: "",
               answer2: "", question3: "", answer3: ""
            })
        }
    });

}

const [errors, setErrors] = useState({});

const handleChange = (event) => {
    setValues({
        ...values,
        [event.target.name]: event.target.value
    })
}

  return (
    <>
   
    <div class="flex flex-row ...">
        <div class="ml-4"> 
            <NavLink  to="/"> <img src={logo} class="w-24" alt=""/> </NavLink>
        </div>
        <div class="ml-4 mt-8">
            <h4 class="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600">VoiceOut </h4>
        </div>
    </div>
   
    <div class="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-lg">
      <div class="px-6 h-full text-center text-gray-800">
            <p class="font-semibold">Anonymous Registration</p>
            <p> Please answer these security questions </p>
      </div>
      <div class="">
        <form onSubmit={handleSubmit}>
            <div class="form-group mb-6 mt-3">
                <label for="selectQuestion1" class="form-label inline-block mb-2 text-gray-700">Question 1</label>
                <select value={values.question1} 
                    onChange={handleChange} 
                    name="question1" 
                    class="form-select block w-full px-3 py-1.5 text-base
                    font-normal text-gray-700 border border-solid border-gray-300 
                    rounded m-0 focus:border-blue-600 focus:outline-none">
                    {regQuestions.map((question) => {
                        return (
                            <option key={question.key} value={question.value}> 
                                {question.text}
                            </option>
                        )
                    })}
                </select>
               {errors.question1 && <p class="text-red-600 text-xs"> {errors.question1} </p>}
            </div>
            <div class="form-group mb-6 mt-3">
                <label class="form-label inline-block mb-2 text-gray-700">Answer 1</label>
                <input name="answer1" type="text" class="form-control block w-full px-4 py-1
                     font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 
                    focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={values.answer1} 
                    onChange={handleChange}/>
                {errors.answer1 && <p class="text-red-600 text-xs"> {errors.answer1} </p>}        
            </div>
            <div class="form-group mb-6 mt-3">
                <label class="form-label inline-block mb-2 text-gray-700">Question 2</label>
                <select value={values.question2} 
                    onChange={handleChange} 
                    name="question2" 
                    class="form-select block w-full px-3 py-1.5 text-base
                    font-normal text-gray-700 border border-solid border-gray-300 
                    rounded m-0 focus:border-blue-600 focus:outline-none">
                    {regQuestions.map((question) => {
                        return (
                            <option key={question.key} value={question.value}> 
                                {question.text}
                            </option>
                        )
                    })}
                </select>
             {errors.question2 && <p class="text-red-600 text-xs"> {errors.question2} </p>}   
            </div>
            <div class="form-group mb-6 mt-3">
                <label class="form-label inline-block mb-2 text-gray-700">Answer 2</label>
                <input type="text" name="answer2" class="form-control block w-full px-4 py-1
                    font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={values.answer2} 
                onChange={handleChange}/>
                {errors.answer2 && <p class="text-red-600 text-xs"> {errors.answer2} </p>}  
            </div>
            <div class="form-group mb-6 mt-3">
                <label class="form-label inline-block mb-2 text-gray-700">Question 3</label>
                <select 
                    value={values.question3} 
                    onChange={handleChange}
                    name="question3" 
                    class="form-select block w-full px-3 py-1.5 text-base
                    font-normal text-gray-700 border border-solid border-gray-300 
                    rounded m-0 focus:border-blue-600 focus:outline-none">
                     {regQuestions.map((question) => {
                        return (
                            <option key={question.key} value={question.value}>   
                                {question.text}
                            </option>
                        )
                    })}
                </select>
                {errors.question3 && <p class="text-red-600 text-xs"> {errors.question3} </p>}  
            </div>
            <div class="form-group mb-6 mt-3">
                <label class="form-label inline-block mb-2 text-gray-700">Answer 3</label>
                <input name="answer3" type="text" class="form-control block w-full px-4 py-1
                     font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                onChange={handleChange} 
                value={values.answer3}/>
                 {errors.answer3 && <p class="text-red-600 text-xs"> {errors.answer3} </p>}
            </div>
            <div class="flex justify-between items-center mb-6"> 
                <NavLink to="/login/anonymous" class="mb-4">
                    <span class="text-blue-600 ease-in-out hover:text-blue-700 transition duration-300"> Anonymous Login </span>
                </NavLink>
                <button type="submit" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs 
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

export default RegisterAnon