import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../config/AxiosIns';
function Register() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const registerSubmit=async (e)=>{
     e.preventDefault();
     try{
      await axiosInstance.post('/user/register',{name,email,password})
      .then((res)=>{
        console.log(res)
      })

     }catch(err){
        console.log("Error is "+err);
     }


  }
  return (
    <div className='w-full  flex justify-around lg:md:flex-row sm:flex-col bg-gray-900 h-[100vh] '>
        <div  className='  self-center '>
          <img className=' w-min' src=" ..\src\assets\images\aboutMainImage.png" alt="registerImage" />
        </div>
        <div className='relative top-[25%] left-[-10%] font-bold  '>
          <form className='flex flex-col' onSubmit={registerSubmit} >
            <label htmlFor="name" className='text-white'>Full Name</label>
            <input  name='name' id='name' type="text" placeholder='Enter name' 
             required onChange={(e)=>setName(e.target.value)} 
             className='w-[130%] rounded-lg p-2'
             />
            <label  htmlFor="email" className='text-white'>Email</label>
            <input  name='email'type="email" id='email' placeholder='Enter Email' 
            required  onChange={(e)=>setEmail(e.target.value)} 
            className='w-[130%] rounded-lg p-2'
             />
            <label htmlFor="password" className='text-white'>Password</label>
            <input name='password' id='password' type="password" placeholder='Enter Password' 
            required  onChange={(e)=>setPassword(e.target.value)}
            className='w-[130%] rounded-lg p-2'
             />
            <button type='submit'
              className=' text-white w-[130%] border-[1px solid red] bg-blue-700 rounded-lg  p-2 my-2 hover:bg-blue-600 transition-all duration-400 ease-in'
              >Register</button>

          </form>
          <p  className=' text-white w-[130%] text-[14px] text-center'>-------------OR------------</p>
          <p className= 'text-white w-[130%] border-[1px solid red] bg-green-600 rounded-lg  p-2 my-2 hover:bg-green-400 transition-all duration-400 ease-in text-center'
>   <Link  >Login</Link></p>
        </div>
    </div>
  )
}

export default Register