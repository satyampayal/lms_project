import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import CourseList from "./Course/CourseList";
import { useDispatch, useSelector } from "react-redux";
import Course from "../Components/Course";
import { useEffect } from "react";
import { getAllCourses } from "../redux/slices/courseSlice";
//import { Dispatch } from "@reduxjs/toolkit";

function Home() {
    const dispatch=useDispatch();
const { courseList } = useSelector((state) => state.course);
console.log(courseList);
async function loadCourses(){
    await dispatch(getAllCourses());
}
useEffect(()=>{
    loadCourses();
},[])

    return (
        <HomeLayout>
            <div className="bg-slate-700 text-white h-[88vh] flex  justify-between items-center select-none  ">
                <div className="flex flex-col justify-between w-[50vw] mx-[20px]">
                    <div className="flex gap-4">
                        <h3 className="font-bold lg:md:text-[30px] text-[19px]"> Upskilling made  </h3>
                        <ul className="font-bold lg:md:text-[30px] text-[19px] w-[33%] text-center h-[40px] overflow-hidden bg-white   transition-all relative animate-slide ">
                            <li className="bg-black mb-1">Practical</li>
                            <li className="bg-black mb-1">Affordable</li>
                            <li className="bg-black">Easy</li>
                        </ul>
                    </div>
                    <div>
                        <p className=" lg:md:text-[16px] text-[13px] text-start  font-bold my-[5px] ">LMS Skills is the one-stop destination for your upskilling journey. Brace yourself to find the best job-ready courses and high-end technologies available in the sector. And if that weren't good enough, get the highest quality course content at the most affordable prices!
                            What are we waiting for ? Let's push Start!</p>
                        <div className=" m-[15px]">
                            <Link to={'/courses'} className='  hover:bg-red-400 hover:text-white transition-all ease-linear duration-300 border-[1px] border-red-300 rounded-lg bg-red-500 text-white p-3 '>
                                Explore course</Link>
                        </div>
                    </div>

                </div>
                <div className=" lg:md:w-[50vw] w-[70vw] ">
                    <img src="..\src\assets\images\homePageMainImage.png" alt="homeImage" />
                </div>

            </div>
            {/* water bank */}
            <div className="h-[24px] bg-blue-300 filter-[1px] rounded-sm">
                <h1 className="text-xl text-white text-center">All courses</h1>
            </div>

            {/* course list all  */}
            <div className='min-h[90vh]  pt-12 pl-20 grid lg:md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 min-h-[81.5vh]  text-white bg-gray-700'>
                {courseList.length > 0 ?
                    courseList.map((c) => (
                        <Course key={c._id} {...c} />
                    )) :
                    (
                        <h1>There is no course yet!</h1>
                    )

                }
            </div>



        </HomeLayout>
    )
}

export default Home;