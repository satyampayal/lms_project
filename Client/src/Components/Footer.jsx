import React from 'react'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
function Footer() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    return (
        <footer className='  relative  w-full left-0 bottom-0    bg-gray-800
                             text-white flex flex-col sm:flex-row flex-wrap  justify-between items-center ' >
            <section className=' m-4 sm:text-[16px] text-lg     '>
                Copyright {year} | All rights reserved
            </section>
            <section className=' flex mx-[20px]
                                 sm:justify-center text-2xl   gap-5'>
                <a href="#" className='hover:scale-[1.3] '>
                    <BsFacebook />
                </a>
                <a href="#" className='hover:scale-[1.3]'>
                    <BsInstagram />
                </a>
                <a href="#" className='hover:scale-[1.3] '>
                    <BsLinkedin />
                </a>
                <a href="#" className='hover:scale-[1.3]'>
                    <BsTwitter />
                </a>
            </section>
        </footer>
    )
}

export default Footer