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
    const [videoLecture,setVideoLecture]=useState('');

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
         console.log(response);
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

    console.log(videoLecture);



    return (
        <HomeLayout>
            <div className=' text-red-300 flex sm:flex-row  flex-col-reverse justify-around  items-center min-h-[81.5vh] p-2 select-none'>
                    
                <div className='w-[30vw]'>
                    <div className='p-2  flex flex-col  '>
                        {
                            //  isLoggedIn === true || isLoggedIn===false  ?            
                                    state?.
                                        numberOfLectures > 0 ?(
                                        <button type='none' className='bg-blue-400 p-2 rounded-md m-1'
                                            onClick={showFreeLecturesHandler} >
                                            show free Lectures
                                        </button>
                                        )
                                        :   <>
                                        <h1 className=''>There is no Demo lecture of this course</h1>
                                    </>
                        }
                        {/* <h1>Number of lectures{state?.numberOfLectures}</h1> */}
                        {state?.
                            numberOfLectures > 0 && isLoggedIn ? <button type='none' className='bg-blue-400 p-2 rounded-md m-1'
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
                            > 0 ? (lectures?.map((l,index) => (
                                <div
                                    key={l._id}
                                    className='  bg-slate-100 p-1 
                                rounded-lg m-1   cursor-pointer text-center '
                                onClick={()=>setVideoLecture(l)}

                                >
                                    {/* <video className='video' controls src={l.lecture.secure_url} width={'540px'} height={'240px'} ></video> */}
                                    {/* video controls div */}
                                    {/* <div className='relative bottom-[40px]  flex-self  '>
                                        // { <FaRegPlayCircle  /> }
                                        <button  className='text-green-500'>play</button>



                                    </div> 
                                    */}
                                    <h1 className='text-green-600'>Lecture:{index+1}</h1>
                                    <h1 className='text-green-600'>Title:{l.title}</h1>
                                    {
                                        role === "ADMIN" ?
                                            <button className='bg-green-600 p-2 rounded-md select-none'
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
                            > 0 ? (freeLectures?.map((l,index) => (
                                <div
                                    key={l._id+"satyam"}
                                    className='  bg-slate-50 p-2  
                                rounded-[10px] m-1 cursor-pointer '

                                onClick={()=>setVideoLecture(l)}

                                >
                                    {/* <video className='video' controls src={l.lecture.secure_url} width={'540px'} height={'240px'} ></video> */}
                                    
                                    {/* video controls div */}
                                    {/* <div className='relative bottom-[40px]  flex-self  '>
                                        // { <FaRegPlayCircle  /> }
                                        <button  className='text-green-500'>play</button>



                                    </div> 
                                    */}
                                    
                                    <h1 className='text-green-600'>Lecture:{index+1}</h1>
                                    <h1 className='text-green-600'>Title:{l.title}</h1>
                                    {/* <h1 className='text-blue-500 text-wrap max-w-[30vw]'>Description:{l.description}</h1> */}
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
                   {/* VIDEO SHOW  */}
                  { 
                   videoLecture===''?
                   <>
                   </>
                   :
                  <div className='sm:w-[70vw] w-[100vw]'>
                        <div>
                            <video src={videoLecture?.lecture?.secure_url}  className='sm:w-full w-[100vw]' controls></video>
                        </div>
                        <div  className='flex w-full flex-col gap-2'>
                            <h1 className='text-black p-2 text-2xl'>Title:{videoLecture?.title}</h1>
                            <h1 className='text-black p-2 text-2xl'>Description:{videoLecture?.description}</h1>
                        </div>
                    </div>}
             
            </div>

        </HomeLayout>
    )
}

export default DisplayLectures