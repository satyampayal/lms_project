import React, { useEffect, useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getLectures } from '../../redux/slices/courseSlice';

function DisplayLectures() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    // console.log(state);
    let [lectures, setLectures] = useState([]);

    const showLectures = async () => {
        const response = await dispatch(getLectures());
        console.log(response);
        setLectures(lectures = response?.payload?.lectures)
        console.log(lectures);
    }


    return (
        <HomeLayout>
            <div className='bg-gray-500 text-white flex justify-center items-center m-auto min-h-[81.5vh]'>
                <div>
                    <div className='p-2'>
                        {/* <h1>Number of lectures{state?.numberOfLectures}</h1> */}
                        <button type='none' className='bg-green-400 p-2 rounded-md' onClick={showLectures} >show Lectures</button>
                    </div>
                    {
                        lectures.map((l) => (
                            <div className='flex flex-col gap-1 bg-slate-50 p-2 rounded-lg mb-3 '>
                                <video src={l.lecture.secure_url} controls width={'540px'} height={'240px'} ></video>
                                <h1 className='text-green-600'>Title:{l.title}</h1>
                                <h1 className='text-blue-500'>About Lecture:{l.description}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>

        </HomeLayout>
    )
}

export default DisplayLectures