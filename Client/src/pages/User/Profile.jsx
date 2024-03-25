import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { Link } from 'react-router-dom';
function Profile() {
    const data = JSON.parse(localStorage.getItem('data')).user;
    // console.log(data);
    return (
        <HomeLayout>
            <div className='bg-gray-600  text-white flex justify-center items-center min-h-[81.5vh]  '>
                <div className='border-white bg-slate-100 rounded-md p-3 w-[40vw] '>
                    <h1 className=' text-red-300  font-bold underline p-2  text-center lg:md:text-2xl sm:text-[24px] text-[20px] '>WelCome {data.role}</h1>
                    <div className=' '>
                        <img src={data?.avatar?.secure_url} className='w-20  h-20 m-auto rounded-full' alt="" />
                    </div>
                    <div  className='  bg-white p-1 mt-2 font-bold text-2xl rounded-2xl border-white text-blue-300  flex lg:md:text-2xl sm:text-[14px] text-[12px] '>
                    Name: <h1 className='text-red-300 ml-1 cursor-default select-none '>{data.fullName}</h1>
                    </div>
                    <div  className=' bg-white p-1 mt-2 font-bold lg:md:text-2xl sm:text-[14px] text-[12px] rounded-2xl border-white text-blue-300  flex'>
                    Email: <h1 className='text-red-300 ml-1 filter blur-sm hover:blur-none  cursor-not-allowed '>{data.email}</h1>
                    </div>
                    <div className='flex lg:md:flex-row sm:flex-row flex-col justify-between  gap-1 w-full   '>
                        <button id='changePassword' className='p-2 lg:md:w-[50vw] sm:w-[40vw] w-[30vw] rounded-md bg-red-400 hover:bg-red-500 transition-all ease-in duration-200 '> <Link to='/me/change-password'>Change Password</Link>   </button>
                    <button id='edit' className='p-2lg:md:w-[50vw] sm:w-[40vw] w-[30vw] rounded-md bg-blue-400 hover:bg-blue-500 transition-all ease-in duration-200 '> 
                    <Link to='/me/edit-profile'> Edit  Profile </Link> 
                    </button>
                    </div>
                </div>
            </div>

        </HomeLayout>
    )
}

export default Profile