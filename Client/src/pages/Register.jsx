import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axiosInstance from '../config/AxiosIns';
import { BsPersonCircle } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createAccount } from '../redux/slices/authSlice';
function Register() {
 const navigate=useNavigate();
 const dispatch=useDispatch();

  const [signupDetails, setSignupDetails] = useState({
    email: '',
    fullName: '',
    password: '',
    avatar: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupDetails({
      ...signupDetails,
      [name]: value
    })
  }

  function handleImage(e){
    e.preventDefault();
    const uploadImage=e.target.files[0];
    if(!uploadImage) return;
    setSignupDetails({
      ...signupDetails,
      avatar:uploadImage
    });
    const fileReader=new FileReader();
    fileReader.readAsDataURL(uploadImage);
    fileReader.addEventListener("load",function(){
      setPreviewImage(this.result)
    })
  }
  const registerSubmit = async (e) => {
    e.preventDefault();
    if (!signupDetails.email || !signupDetails.fullName || !signupDetails.password || !signupDetails.avatar) {
      toast.error('please fill all details')
      return;
    }
    if (signupDetails.fullName.length < 4) {
      toast.error('Name should be atleast of 4 characters')
      return;
    }
    // ToDo Email valdation 
    

    //Todo Password Constrints
    

   const formData=new FormData();
   formData.append("fullName",signupDetails.fullName);
   formData.append("email",signupDetails.email);
   formData.append("password",signupDetails.password);
   formData.append("avatar",signupDetails.avatar);

    const response= await dispatch(createAccount(formData));
    console.log(response);
    if(response?.payload?.success){
      return navigate('/');
    }
    setSignupDetails({
      email: '',
      fullName: '',
      password: '',
      avatar: ''}
    
    )
    setPreviewImage('');


  }


  return (
    <div className='  w-full  flex justify-around lg:md:flex-row  flex-col bg-gray-900 lg:md:h-[100vh] h-[100vh] '>
      {/* <div  className='  self-center '>
          <img className=' ' src=" ..\src\assets\images\aboutMainImage.png" alt="registerImage" />
        </div> */}
      <div className=' self-center  border-zinc-100  border-[2px] p-7 rounded-[15px] m-2'>
        <form className='flex flex-col flex-nowrap' onSubmit={registerSubmit} >
          <h1 className='text-white text-center font-bold text-2xl my-3'>Register</h1>

          <label htmlFor='image_uploads' className=' cursor-pointer flex  justify-center  items-center '>
            {
              previewImage ? (
                <img className='w-24 h-24 m-auto rounded-full ' src={previewImage} />
              ) : (
                <BsPersonCircle className='w-24 h-24 m-auto rounded-full text-white' />

              )}
          </label>
          <input
            type='file'
            className='hidden'
            name='image_uploads'
            id='image_uploads'
            accept='.jpeg,.png,.svg,.jpg'
            onChange={handleImage}
          />
          <label htmlFor="fullName" className='text-white'>Full Name</label>
          <input
            required
            name='fullName'
            id='fullName'
            type="text"
            placeholder='Enter name'
            onChange={handleUserInput}
            value={signupDetails.fullName}
            className='lg:md:w-[20vw] w-[50vw]   rounded-lg p-2 my-2'
          />
          <label htmlFor="email" className='text-white'>Email</label>
          <input
            required
            name='email'
            type="email"
            id='email'
            placeholder='Enter Email'
            onChange={handleUserInput}
            value={signupDetails.email}
            className=' lg:md:w-[20vw] w-[50vw] rounded-lg p-2  my-2'
          />
          <label htmlFor="password" className='text-white'>Password</label>
          <input
            required
            name='password'
            id='password'
            type="password"
            placeholder='Enter Password'
            onChange={handleUserInput}
            value={signupDetails.password}

            className='lg:md:w-[20vw] w-[50vw] rounded-lg p-2  my-2'
          />
          <button type='submit'
            className='lg:md:w-[20vw] w-[50vw] text-white border-[1px solid red] bg-blue-700 rounded-lg  p-2 my-2 hover:bg-blue-600 transition-all duration-400 ease-in'
          >Create Account</button>

        </form>
        <p className='lg:md:w-[20vw] w-[50vw]  text-white  text-[14px] text-center'>-------------OR------------</p>

        <p className='text-white'
        > Already have an account ?  <Link to="/login"
          className=' text-blue-500'
        >Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register