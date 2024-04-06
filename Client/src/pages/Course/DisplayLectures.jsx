import React, { useEffect, useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteLecture, freeLectureOnly, getLectures } from '../../redux/slices/courseSlice';
import { FaRegPlayCircle } from "react-icons/fa";
function DisplayLectures() {
    const { role, isLoggedIn } = useSelector((state) => state.auth);
    // console.log(role);
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(state?.numberOfLectures);
    let [lectures, setLectures] = useState([]);
    let [freeLectures, setFreeLectures] = useState([]);

    const showLecturesHandler = async () => {
        const response = await dispatch(getLectures());
        // console.log(response);
        setLectures(lectures = response?.payload?.lectures)
        // console.log(lectures);

        // const video=document.getElementsByClassName('video');
        // console.log(video);
        // video.play();


    }

    const showFreeLecturesHandler = async () => {
        const response = await dispatch(freeLectureOnly());
        // console.log(response);
        setFreeLectures(freeLectures = response?.payload?.lectures)
        // console.log(lectures);
    }


    const lectureDeleteHandler = async () => {
        const response = await dispatch(deleteLecture());
        // console.log(response);
        if (response) {
            navigate('/')
        }
    }

    // const videoPlay=(video)=>{
    //     video.play();

    // }




    return (
        <HomeLayout>
            <div className='bg-gray-500 text-white flex justify-center items-center m-auto min-h-[81.5vh]'>
                <div>
                    <div className='p-2 flex flex-col justify-between'>
                        {
                            //  isLoggedIn === true || isLoggedIn===false  ?            
                                    state?.
                                        numberOfLectures > 0 ?(
                                        <button type='none' className='bg-blue-400 p-2 rounded-md mb-2'
                                            onClick={showFreeLecturesHandler} >
                                            show free Lectures
                                        </button>
                                        )
                                        :   <>
                                        <h1 className=''>There is no free lecture of this course</h1>
                                    </>
                        }
                        {/* <h1>Number of lectures{state?.numberOfLectures}</h1> */}
                        {state?.
                            numberOfLectures > 0 && isLoggedIn ? <button type='none' className='bg-blue-400 p-2 rounded-md'
                                onClick={showLecturesHandler} >
                            show Lectures
                        </button>
                            : <>
                                {/* <h1>Thear is no Lecture uploaded!</h1> */}
                            </>

                        }
                        {
                            role === 'ADMIN' ?
                                <button type='none' className='bg-green-600 p-2 rounded-md'    >
                                    <Link to={`/course/addLecture/${state?._id}`}>
                                        Add Lectures
                                    </Link></button>
                                : <></>
                        }
                    </div>
                    {
                        state?.
                            numberOfLectures
                            > 0 ? (lectures?.map((l) => (
                                <div
                                    key={l._id}
                                    className=' flex flex-col gap-1 bg-slate-50 p-2 
                                rounded-lg mb-3 justify-center items-center relative'

                                >
                                    <video className='video' controls src={l.lecture.secure_url} width={'540px'} height={'240px'} ></video>
                                    {/* video controls div */}
                                    {/* <div className='relative bottom-[40px]  flex-self  '>
                                        // { <FaRegPlayCircle  /> }
                                        <button  className='text-green-500'>play</button>



                                    </div> 
                                    */}
                                    <h1 className='text-green-600'>Title:{l.title}</h1>
                                    <h1 className='text-blue-500 text-wrap max-w-[30vw]'>Description:{l.description}</h1>
                                    {
                                        role === "ADMIN" ?
                                            <button className='bg-green-600 p-2 rounded-md'
                                                onClick={() => lectureDeleteHandler()}
                                            ><Link to={`/course/lectures?courseId=${state._id}&lectureId=${l._id}`}>Delete Lectures</Link> </button>

                                            : <>
                                            </>
                                    }
                                </div>
                            ))
                        ) :
                            <h1 className='text-2xl font-bold text-red-200s'>There is no lecture upload yet!</h1>

                    }

                    {/* Free lecture  */}
                    {
                        state?.
                            numberOfLectures
                            > 0 ? (freeLectures?.map((l) => (
                                <div
                                    key={l._id+"satyam"}
                                    className=' flex flex-col gap-1 bg-slate-50 p-2 
                                rounded-lg mb-3 justify-center items-center relative'

                                >
                                    <video className='video' controls src={l.lecture.secure_url} width={'540px'} height={'240px'} ></video>
                                    {/* video controls div */}
                                    {/* <div className='relative bottom-[40px]  flex-self  '>
                                        // { <FaRegPlayCircle  /> }
                                        <button  className='text-green-500'>play</button>



                                    </div> 
                                    */}
                                    <h1 className='text-green-600'>Title:{l.title}</h1>
                                    <h1 className='text-blue-500 text-wrap max-w-[30vw]'>Description:{l.description}</h1>
                                    {
                                        role === "ADMIN" ?
                                            <button className='bg-green-600 p-2 rounded-md'
                                                onClick={() => lectureDeleteHandler()}
                                            ><Link to={`/course/lectures?courseId=${state._id}&lectureId=${l._id}`}>Delete Lectures</Link> </button>

                                            : <>
                                            </>
                                    }
                                </div>
                            ))
                        ) :
                            <h1 className='text-2xl font-bold text-red-200s'>There is no free lecture upload yet!</h1>

                    }
                </div>
            </div>

        </HomeLayout>
    )
}

export default DisplayLectures