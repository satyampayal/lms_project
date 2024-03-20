import React from 'react'
import { Link } from 'react-router-dom'
function Course(c) {
  return (
    <div className=' border-[1px] rounded-lg bg-gray-600 w-[250px] h-[300px]
      m-1 text-center font-bold cursor-default
     flex flex-col justify-center place-content-center 
     hover:scale-2 transition-all duration-200 ease-in
     '>
        <h1 className='text-green-300'>Category : {c.category}</h1>
       <Link to={`./${c._id}`}>
       <img className='cursor-pointer' src={c.thumbnail.secure_url} alt="course Image" />
       </Link>

            <h1 className='text-green-400'>Title : {c.title}</h1>
            <p>Description : {c.description}</p>
        <button className='w-full h-[50px] text-center bg-red-500 rounded-md '>Price:20$</button>
    </div>
  )
}

export default Course