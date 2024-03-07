import React from 'react'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
function Footer() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    return (
        <footer className=' relative left-0 bottom-0 lg:md:h-[10vh] sm:h-[20vh]  py-5 bg-gray-800 text-white flex flex-col sm:flex-row items-center ' >
            <section className=' m-4 sm:text-[16px] text-lg '>
                Copyright {year} | All rights reserved
            </section>
            <section className='justify-end flex items-center lg:md:justify-end sm:justify-center text-2xl   gap-5'>
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