import React from 'react'

function Header() {
  return (
    <div className=' py-2 flex place-items-center justify-evenly  '>
        <div className='  justify-items-start  '>
            <a href="#">
                <img src="..\src\assets\images\QuotesPersonalityImage\einstein.png" width={'50'} alt="icon" />
            </a>
        </div>
        <div className='flex justify-center items-center'>
            <input type="text"  placeholder='Explore Your product' className=' border-2 border-red-300 rounded-[5px] p-2 mx-2 active:border-red-400'/>
            <button className=' border-2 border-red-300 rounded-[5px] p-1'>search</button>
        </div>
        <ul className='flex justify-end items-center gap-5'>
            <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Home</a></li>
            <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Explore</a></li>
            <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Course List</a></li>
            <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">Contact us</a></li>
            <li className=' hover:border-b-red-400 hover:border-b-[1px] transition-all ease-linear duration-300'><a href="#">About us</a></li>
          
        </ul>
    </div>
  )
}

export default Header