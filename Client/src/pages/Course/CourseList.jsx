import  { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'

import HomeLayout from '../../layouts/HomeLayout'
import { getAllCourses } from '../../redux/slices/courseSlice'
import Course from '../../Components/Course';
function CourseList() {
    const dispatch=useDispatch();
   
    const {courseList}=useSelector((state)=>state.course);

    async function loadCourses(){
        await dispatch(getAllCourses());
    }
    useEffect(()=>{
        loadCourses();
    },[])
  return (
    <HomeLayout>
        <div className='min-h[90vh] pt-12 pl-20 grid lg:md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 text-white bg-gray-700'>
            {courseList.length>0?
            courseList.map((c)=>(
                <Course key={c._id} {...c} />
            )):
            (
                <h1>There is no course yet!</h1>
            )
        
            }
        </div>

        </HomeLayout>
  )
}

export default CourseList