import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayout from '../../layouts/HomeLayout';
import { deleteCourse } from '../../redux/slices/courseSlice';
function CourseDescription() {
    const { state } = useLocation();
    console.log(state)
    const navigate = useNavigate();

    const { role, data, isLoggedIn } = useSelector((state) => state.auth); // this select user deatils  from authSlice.jsx we have some state
    //console.log(isLoggedIn);

    const dispatch=useDispatch();
    // const {courseId}=useParams();
    // console.log("From Course Description "+courseId);

    // delet course Handler
   const deleteCourseHandler=async (e)=>{
    e.preventDefault();

    const response=await dispatch(deleteCourse());
    console.log(response);
    
     navigate('/courses');

   }

    return (
        <HomeLayout>
            <div className='min-h-[77.5vh] bg-gray-600 p-2  '>
                <div className='w-[50%] p-2 m-auto flex flex-col border rounded-2xl  font-bold text-white' >
                    <img src={state.thumbnail.secure_url} className='w-[100%]' alt="" />
                    <p>Course:{state.title}</p>
                    <p>Category:{state.category}</p>
                    <p>Instruct By:{state.createdBy}</p>
                    <p>Description Of Course : <br />{state.description}</p>
                    {
                        role === "ADMIN" || data?.subscription?.status === 'active' ?
                            (
                                <button
                                    onClick={() => navigate('/course/displaylectures', { state: { ...state } })}
                                    className='  p-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-200 ease-in'>
                                    Watch lectures
                                </button>
                            )
                            :
                            (
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className=' p-4 rounded-xl bg-red-500 hover:bg-red-600 transition-all duration-200 ease-in'
                                >
                                    Subscribed
                                </button>
                            )
                    }

                    {
                        role === "ADMIN"?
                            (
                                <>
                                    <button
                                    onClick={deleteCourseHandler}
                                        className=' mt-2 p-4 rounded-xl bg-red-500 hover:bg-red-600 transition-all duration-200 ease-in'

                                    >
                                        Delete Course
                                    </button>
                                </>
                            )
                            :
                            (
                                <>
                                </>
                            )
                    }
                </div>

            </div>

        </HomeLayout>
    )
}

export default CourseDescription