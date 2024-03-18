import React from 'react'
import { Link } from 'react-router-dom'
import authSlice, { logout } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
function Header() {
    const dispatch=useDispatch();
    //const {user}=authSlice();
    const data=JSON.parse(localStorage.getItem('data'));
    // console.log(data.user.avatar.secure_url);
    const showOptions=async ()=>{
    //     const showDetails=document.getElementById('showDetails');
    //    console.log(showDetails);
    const response=await  dispatch(logout());
    console.log(response);

    }
    return (
        <div>


            <div className=' bg-slate-700 text-white py-2 flex items-center justify-between   '>
                <div className='  justify-items-start ml-10  '>
                    <a href="#" className=' font-extrabold font-mono text-pretty'>
                        {/* <img src="..\src\assets\images\QuotesPersonalityImage\einstein.png" width={'50'} alt="icon" /> */}
                        s3
                    </a>
                </div>
                <div className='flex justify-center items-center'>
                    <input type="text" placeholder='Explore Your product' className=' border-2 border-red-300 rounded-[5px] p-2 mx-2 active:border-red-400' />
                    <button className=' border-2 border-red-300 rounded-[5px] p-1'>search</button>
                </div>
                <ul className='flex gap-3 mr-5 '>
                    <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Home</a></li>
                    <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Explore</a></li>
                    {/* <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Course List</a></li> */}
                    {/* <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Contact us</a></li> */}
                    {/* <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">About us</a></li> */}
                    {
                        localStorage.getItem('isLoggedIn') ?
                        <li id='showDetails' onClick={showOptions} className='  w-full h-full rounded-full bg-red-400  hover:scale-[1.2] transition-all duration-200    '>
                        {/* <img src={localStorage.getItem('data').user.avatar.secure_url} alt="" /> */}
                        {/* <h1>{data.user}</h1> */}
                    <img src={data.user.avatar.secure_url}   className='w-[30px] h-[30px]  rounded-full' alt="" />
                    </li>
                            :
                            <li className=' hover:bg-red-600 hover:scale-110 transition-all ease-linear duration-200 bg-red-500 rounded-[6px] border-[1px solid red] p-[7px] '>
                            <Link to="/login">Login/Register</Link>
                        </li>
                    }


                </ul>
            </div>


            {/* (
        <div>
            Side Bar
        </div>

           )
      */
            }

        </div>
    )
}

export default Header