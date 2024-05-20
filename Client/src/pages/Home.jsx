import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import CourseList from "./Course/CourseList";
import { useDispatch, useSelector } from "react-redux";
import Course from "../Components/Course";
import { useEffect, useState } from "react";
import { getAllCourses } from "../redux/slices/courseSlice";

function Home() {
    let [filterCourse, setFilterCourse] = useState([]);
    let [categoryList, setCategoryList] = useState(localStorage.getItem('category') ||[]);
    const dispatch = useDispatch();
    const { courseList } = useSelector((state) => state.course);
    // console.log(courseList);
    const filterCourseHandler = (category) => {
        let newArray = courseList.filter((e) => {
            // console.log(category);
            return e.category == category;
        });
        //  console.log(newArray);

        setFilterCourse(filterCourse = newArray);
        console.log(filterCourse);
    }

    // let newArray=courseList.filter((e)=>{
    //    return e.category==='React -js';
    // })
    async function loadCourses() {

        await dispatch(getAllCourses());


    }
    // const handleCategory=()=>{
    //     setCategoryList(categoryList=localStorage.getItem('category'));

    // }
    useEffect(() => {
        loadCourses();
        // handleCategory();
        // console.log("After"+localStorage.getItem('category'))
        // const res=localStorage.getItem('category');
        // console.log(res);
        // localStorage.setItem('category',res.split(','));
        // console.log("Before"+localStorage.getItem('category'))

        // filterCourseHandler('React -js');
        // arrHandler();
    }, [])
    // console.log(filterCourse);

    // let arr = [];
    // let uniqueArray = [];
    // function unique(value, index, array) {
    //     return array.indexOf(value) === index;

    // }
    // function arrHandler() {
    //     courseList.map((c) => {
    //         arr.push(c.category);
    //     });

    //     uniqueArray = arr.filter(unique);
    //     localStorage.setItem('category',uniqueArray);
    //     const res=localStorage.getItem('category');
    //     setCategoryList(categoryList = res.split(','));

        // console.log(res.split(','));
    // }
    // setInterval(arrHandler,1000);


    return (
        <HomeLayout>
            <div   onClick={() => {
            const showCourseMenu = document.getElementById('show_course_menu');
            showCourseMenu.classList.replace('flex', 'hidden');
            const showWebMenu = document.getElementById('show_web_menu');
            showWebMenu.classList.replace('flex', 'hidden');
        }}
             className="bg-slate-700 text-white sm:min-h-[88vh] flex  justify-between items-center select-none  sm:flex-row flex-col  ">
                <div className="flex flex-col justify-between w-[90vw] mx-[20px]">
                    <div className="flex gap-4">
                        <h3 className="font-bold sm:text-[30px] text-[19px]"> Upskilling made  </h3>
                        <ul className="font-bold lg:md:text-[30px] text-[19px] w-[33%] text-center h-[40px] overflow-hidden bg-white   transition-all relative animate-slide ">
                            <li className="bg-black mb-1">Practical</li>
                            <li className="bg-black mb-1">Affordable</li>
                            <li className="bg-black">Easy</li>
                        </ul>
                    </div>
                    <div className="">
                        <p className=" lg:md:text-[16px] text-[13px] text-start  font-bold my-[5px] ">LMS Skills is the one-stop destination for your upskilling journey. Brace yourself to find the best job-ready courses and high-end technologies available in the sector. And if that weren't good enough, get the highest quality course content at the most affordable prices!
                            What are we waiting for ? Let's push Start!</p>
                        <div className=" mt-4">
                            <Link to={'/courses'} className='  hover:bg-red-400 hover:text-white transition-all ease-linear duration-300 border-[1px] border-red-300 rounded-lg bg-red-500 text-white p-3 '>
                                Explore course</Link>
                        </div>
                    </div>

                </div>
                <div className="  ">
                    <img src="https://th.bing.com/th?id=OIP.p6ckKuaSJMchiVblO3PscAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="homeImage" />
                </div>

            </div>
            {/* water bank */}
            {/* <div className="h-[24px] bg-blue-300 filter-[1px] rounded-sm">
                <h1 className="text-xl text-white text-center">All courses</h1>
            </div> */}
            <div className="  flex  sm:flex-row flex-col gap-2  justify-evenly items-center p-1 flex-wrap ">
                 <button className="  hover:text-red-400 sm:hover:bg-inherit hover:bg-green-300 sm:rounded-none rounded-lg sm:p-0 p-3  text-center   transition-all ease-linear duration-300" onClick={() => filterCourseHandler('Web Development')}>Web Development</button>
                <button className=" hover:text-red-400 sm:hover:bg-inherit hover:bg-green-300 sm:rounded-none rounded-lg sm:p-0 p-3  text-center   transition-all ease-linear duration-300" onClick={() => filterCourseHandler('Python')}>Python</button>
                <button className=" hover:text-red-400 sm:hover:bg-inherit hover:bg-green-300 sm:rounded-none rounded-lg sm:p-0 p-3  text-center   transition-all ease-linear duration-300" onClick={() => filterCourseHandler('HTML')}>HTML</button>
                <button className=" hover:text-red-400 sm:hover:bg-inherit hover:bg-green-300 sm:rounded-none rounded-lg sm:p-0 p-3  text-center   transition-all ease-linear duration-300" onClick={() => filterCourseHandler('CSS')}>CSS</button>
                <button className=" hover:text-red-400 sm:hover:bg-inherit hover:bg-green-300 sm:rounded-none rounded-lg sm:p-0 p-3  text-center   transition-all ease-linear duration-300" onClick={() => filterCourseHandler('React -js')}>React -js</button> 

                {/* {
                    courseList.length > 0
                        ?
                        categoryList.map((c) => 
                       

                            <button key={c} className="p-1 rounded-md active:bg-red-400" onClick={() => filterCourseHandler(c)}>{c}</button>

                        )
                        :
                        <>
                            <button className="p-1 rounded-md active:bg-red-400" onClick={() => filterCourseHandler('Web Development')}>Web Development</button>
                            <button className="p-1 rounded-md active:bg-red-400" onClick={() => filterCourseHandler('Python')}>Python</button>
                            <button className="p-1 rounded-md active:bg-red-400" onClick={() => filterCourseHandler('HTML')}>HTML</button>
                            <button className="p-1 rounded-md active:bg-red-400" onClick={() => filterCourseHandler('CSS')}>CSS</button>
                            <button className="p-1 rounded-md active:bg-red-400" onClick={() => filterCourseHandler('MySql')}>MySql</button>
                            <button className="p-1 rounded-md active:bg-red-400" onClick={() => filterCourseHandler('React -js')}>React -js</button>

                        </> }*/
                        }
                
            </div>

            {/* course list all  */}
            <div className='min-h[90vh]  pt-12 pl-20 grid lg:md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 min-h-[81.5vh]  text-white bg-gray-700'>
                {filterCourse.length > 0 ?
                    filterCourse.map((c) => (
                        <Course key={c._id} {...c} />
                    )) :
                    (

                        courseList.map((c) => (
                            <Course key={c._id} {...c} />
                        )
                        )
                    )

                }
            </div>



        </HomeLayout>
    )
}

export default Home;