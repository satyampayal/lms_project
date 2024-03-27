import React, { useEffect, useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getLectures } from '../../redux/slices/courseSlice';

function DisplayLectures() {
    const { role } = useSelector((state) => state.auth);
    // console.log(role);
    const { state } = useLocation();
    const dispatch = useDispatch();
    console.log(state);
    let [lectures, setLectures] = useState([]);

    const showLecturesHandler = async () => {
        const response = await dispatch(getLectures());
        console.log(response);
        setLectures(lectures = response?.payload?.lectures)
        console.log(lectures);
    }

    // // add lecture event
    // const addLectureHandler = async () => {

    // }


    return (
        <HomeLayout>
            <div className='bg-gray-500 text-white flex justify-center items-center m-auto min-h-[81.5vh]'>
                <div>
                    <div className='p-2 flex justify-between'>
                        {/* <h1>Number of lectures{state?.numberOfLectures}</h1> */}
                        {state.
                            numberOfLectures > 0 ? <button type='none' className='bg-green-400 p-2 rounded-md' onClick={showLecturesHandler} >show Lectures</button>
                            : <>

                            </>

                        }
                        {
                            role === 'ADMIN' ?
                                <button type='none' className='bg-green-600 p-2 rounded-md'    ><Link to={`/course/addLecture/${state._id}`}>Add Lectures</Link></button>
                                : <></>
                        }
                    </div>
                    {
                        state.
                            numberOfLectures
                            > 0 ? (lectures.map((l) => (
                                <div key={l._id} className='flex flex-col gap-1 bg-slate-50 p-2 rounded-lg mb-3 justify-center items-center'>
                                    <video src={l.lecture.secure_url} controls width={'540px'} height={'240px'} ></video>
                                    <h1 className='text-green-600'>Title:{l.title}</h1>
                                    <h1 className='text-blue-500 text-wrap max-w-[30vw]'>Description:{l.description}</h1>
                                    {
                                        role === "ADMIN" ?
                                            <button type='none' className='bg-green-600 p-2 rounded-md'    >Delete Lectures</button>

                                            : <>
                                            </>
                                    }
                                </div>
                            ))
                        ) :
                            <h1 className='text-2xl font-bold text-red-200s'>There is no lecture upload yet!</h1>

                    }
                </div>
            </div>

        </HomeLayout>
    )
}

export default DisplayLectures