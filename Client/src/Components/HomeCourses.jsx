import React from 'react'
import { useEffect,useState } from 'react'
//import axiosInstance from '../config/AxiosIns';
import axios from 'axios';

function HomeCourses() {
    //const [getCourses,setCourses] =useState([]);
    useEffect( ()=>{
       axios.get('http://localhost:3001/api/v1/courses')
       .then(res=>{
        console.log(res.json())
       })
    
        
    },[])
  
  return (
    <div>
        Hii

    </div>
  )
}

export default HomeCourses