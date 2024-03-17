import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate  } from 'react-router-dom';
import { loginAccount } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    


    const [signinDetails, setSigninDetails] = useState({
        email: '',
        password: '',
    })
    const handleUserInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setSigninDetails({
            ...signinDetails,
            [name]: value,
        })
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        if (!signinDetails.email || !signinDetails.password) {
            toast.error('enter all details')
            return;
        }
        if (signinDetails.password.length < 8) {
            toast.error('password length should be 8 character')
            return;
        }

        const response = await   dispatch(loginAccount(signinDetails));
        console.log(response);

        if (response?.payload?.data?.success) {
             navigate('/');
        }
        setSigninDetails({
            email: '',
            password: '',
        })


    }
 
        return (
        <div className='  w-full  flex justify-around lg:md:flex-row  flex-col bg-gray-900 lg:md:h-[100vh] h-[100vh] '>

            <div className=' self-center  border-zinc-100  border-[2px] p-7 rounded-[15px] m-2'>
                <form className='flex flex-col flex-nowrap' onSubmit={loginSubmit} >
                    <h1 className='text-white text-center font-bold text-2xl my-3'>Sign In</h1>

                    <label htmlFor="email" className='text-white'>Email</label>
                    <input
                        required
                        name='email'
                        type="email"
                        id='email'
                        placeholder='Enter Email'
                        onChange={handleUserInput}
                        value={signinDetails.email}
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
                        value={signinDetails.password}

                        className='lg:md:w-[20vw] w-[50vw] rounded-lg p-2  my-2'
                    />
                    <button type='submit'
                        className='lg:md:w-[20vw] w-[50vw] text-white border-[1px solid red] bg-blue-700 rounded-lg  p-2 my-2 hover:bg-blue-600 transition-all duration-400 ease-in'
                    >Login </button>

                </form>
                <p className='lg:md:w-[20vw] w-[50vw]  text-white  text-[14px] text-center'>-------------OR------------</p>

                <p className='text-white'
                > You Don't have an account ?  <Link to="/register"
                    className=' text-blue-500'
                >Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login