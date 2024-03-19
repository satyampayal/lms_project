import React, { useEffect } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { getAllCourses } from '../../redux/slices/courseSlice'
import {  useDispatch, useSelector } from 'react-redux'
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
        <div className='min-h[90vh] pt-12 pl-20 flex flex-col text-white bg-gray-700'>
            <h1 className='text-[40px] text-orange-500'>All Courses</h1>
            {courseList.length}
        </div>

        </HomeLayout>
  )
}

export default CourseList