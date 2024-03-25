import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';

function ChangePassword() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [passwordDetails,setPasswordDetails]=useState({
    oldPassword:'',
    newPassword:''
  });

  const passwordHandler=(e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    setPasswordDetails({
      ...passwordDetails,
      [name]:value
    })
  }
   const changePasswordSubmit=async (e)=>{
    e.preventDefault();
    if(passwordDetails.oldPassword.length<8 || passwordDetails.newPassword.length<8 ){
      return toast.error('Length scholud be must 8 Charster')
    }
    const response=await dispatch(changePassword(passwordDetails));
//console.log(response);
    if(response){
      navigate('/');

    }


   }
  return (
    <HomeLayout>
      <div className='bg-gray-500  font-bold min-h-[80vh] flex justify-center items-center '>
        <div className="">
          <form  onSubmit={changePasswordSubmit}
            className='flex justify-center items-center flex-col w-[50vw]
           gap-3  bg-gray-50 p-2 rounded-lg ' >
            <div>
              <label htmlFor="oldPassword"
                className="text-green-400"
              >Old Password*:</label>
              <input type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder='Enter old Password please'
                className='p-2 bg-blue-100 rounded-md text-start '
                value={passwordDetails.oldPassword}
                onChange={passwordHandler}
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword"
                className="text-green-400"
              >
                New Password*:</label>
              <input type="password"
                name="newPassword"
                id="newPassword"
                placeholder='Enter new Password please'
                className='p-2 bg-blue-100 rounded-md text-start '
                value={passwordDetails.newPassword}
                onChange={passwordHandler}
                required
              />
            </div>
            <button type='submit'
              className='bg-green-300 hover:bg-green-500 transition-all duration-200 ease-in p-2 rounded-md w-full'
            >Change Password</button>

          </form>
        </div>


      </div>
    </HomeLayout>
  )
}

export default ChangePassword