import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Header() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem('isLoggedIn'));
    const [toogle, setToogle] = useState(false);
    let data =localStorage.getItem('data') ;
     data=JSON.parse(data);
     //console.log(data.user.avatar.secure_url);
    //  console.log(data);

    // for ADMIN header 

    let { isLoggedIn, role } = useSelector((state) => state.auth);
    // console.log(data)

   // console.log("From header file login" + isLoggedIn + "And role is:" + role);
    // ADMIN Header End

    // show Option of Profile start
    const hideOption = () => {
        const showDetails = document.getElementById('showDetails');
        // console.log(showDetails);
        showDetails.classList.replace('flex', 'hidden');
        setToogle(!toogle);

    }
    const showOptions = () => {
        const showDetails = document.getElementById('showDetails');
        //console.log(showDetails);
        showDetails.classList.replace('hidden', 'flex');
        setToogle(!toogle);
    }

    // show option profile  end

    // logout Functionalty 
    const logoutHandler = async () => {
        const response = await dispatch(logout());
        setIsLogin(false);
        navigate('/');
        
        // console.log(response);
    }
    return (
        <div>


            <div className=' bg-gray-700 text-white   py-2 flex sm:flex-row flex-col    justify-between    '>
                {/* Logo div */}
                <div className='  justify-items-start ml-10 cursor-pointer   '>
                    <Link to={'/'} className=' font-extrabold font-mono text-pretty'>
                        {/* <img src="..\src\assets\images\QuotesPersonalityImage\einstein.png" width={'50'} alt="icon" /> */}
                        s3
                    </Link>
                </div>
                {/* Serch Field */}
                {/* <div className='flex justify-center items-center'>
                    <input type="text" placeholder='Explore Your product' className=' border-2 border-red-300 rounded-[5px] p-2 mx-2 active:border-red-400' />
                    <button className=' border-2 border-red-300 rounded-[5px] p-1'>search</button>
                </div> */}
                {/* Menu field */}
                <ul className='flex sm:flex-row flex-col    sm:gap-3 gap-1  sm:mr-5'>
                    <li className='lg:hover:text-red-400 sm:hover:bg-inherit  hover:bg-green-300 sm:rounded-none rounded-lg sm:p-0 p-3  text-center    transition-colors duration-200 ease-in '>
                        <Link to={'/'}>Home</Link></li>
                    <li className='hover:text-red-400 sm:hover:bg-inherit hover:bg-green-300 sm:rounded-none rounded-lg sm:p-0 p-3  text-center  transition-colors duration-200 ease-in '>
                        <Link to={'/courses'}>Explore</Link></li>
                    {
                        isLoggedIn && role==='ADMIN'
                        ?<>
                            <li className=' hover:text-red-400 sm:hover:bg-inherit hover:bg-green-300 sm:rounded-none rounded-lg sm:p-0 p-3  text-center   transition-all ease-linear duration-300'><Link  to={'/course/create'}>Create course</Link></li> 
                            <li className=' hover:text-red-400 sm:hover:bg-inherit hover:bg-green-300 sm:rounded-none rounded-lg sm:p-0 p-3  text-center   transition-all ease-linear duration-300'><Link  to={'/admin/dashboard'}>Admin DashBoard</Link></li> 
                             
                            </>
                        :
                        (
                            <>

                            </>
                        )

                    }
                    {/* <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Course List</a></li> */}
                    {/* <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Contact us</a></li> */}
                    {/* <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">About us</a></li> */}
                </ul>
                {/* Login/Register/profile button */}
                {
                    isLogin ?
                        <div onClick={toogle ? hideOption : showOptions} className='  sm:relative sm:right-8  self-center   '>
                            <div className='  '>
                                <img src={data?.user?.avatar?.secure_url} className='  cursor-pointer w-[40px] h-[40px]  p-[2px] bg-red-400  rounded-full hover:scale-[1.08] transition-all duration-200  ' alt="" />
                            </div>
                            <div id='showDetails' className=' showDetails hidden   absolute sm:top-[50px] sm:left-[-50px] z-50 flex-col justify-center items-center w-[100px]   text-center h-[full] rounded-[10px] bg-gray-800'>
                                <Link to={'/courses'} className='hover:text-red-400 transition-colors duration-200 ease-in '>courses</Link>
                                <Link to={'/me'} className='hover:text-red-400 transition-colors duration-200 ease-in '>my profile</Link>
                                <Link onClick={logoutHandler} className='hover:text-red-400 transition-colors duration-200 ease-in '>logout</Link>
                            </div>
                        </div>
                        :
                        <div className='m-top-1 cursor-pointer sm:relative sm:right-8 sm:p-[7px]  text-center hover:bg-red-600 hover:scale-110 transition-all ease-linear duration-200 bg-red-500 rounded-lg border-[1px solid red] p-[7px] '>
                            <Link to="/login">Login/Register</Link>
                        </div>
                }
            </div>
        </div>
    )
}

export default Header