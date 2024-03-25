import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Course(c) {
  const navigate=useNavigate();
 // console.log(c);
  
  return (
    <div onClick={()=> navigate(`/course/description/${c?._id}`, {state:{...c}})}
    className=' border-[1px] rounded-lg bg-gray-600 w-[250px] h-full
       text-center font-bold cursor-default
     flex flex-col justify-center place-content-center 
     hover:scale-2 transition-all duration-200 ease-in 
     '>
        <h1 className='text-green-300'>Category : {c?.category}</h1>
       {/* <Link to={`./:${c._id}`}> */}
       <img className='cursor-pointer w-full h-[200px]' src={c?.thumbnail?.secure_url} alt="course Image" />
       {/* </Link> */}

            <h1 className='text-green-400'>Title : {c?.title}</h1>
            <p>CreatedBy : {c?.createdBy}</p>
        <button className='w-full h-[40px] self-end text-center bg-red-500 rounded-md '>Price:20$</button>
    </div>
  )
}

export default Course