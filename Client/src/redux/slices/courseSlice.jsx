//isLoggedIn state is dynamic so it store in localStorage
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../config/AxiosIns";

// for on Refresh not  go anyWhere
const initialState = {
     courseList:[]
}


// get all courses 

export const getAllCourses = createAsyncThunk('/course/getAllCourses', async () => {
  const response = axiosInstance.get('/courses');

  try {
  toast.promise(response,{
    loading:'wait fetching all courses',
    success:(data)=>{
       return data?.data?.message;
    },
    error: 'failed to get  courses'

  }

  )
  } catch (error) {
    toast.error(error.message);
    
  }
  return (await response).data.courses;

 

})

// Crete Cousres by admin
export const createCourse=createAsyncThunk('/course/createCourse',async (data)=>{
 
  const response=axiosInstance.post('/courses',data);
  try {
    toast.promise(response,{
      loading:'wait for create Course',
      success:(data)=>{
        return data?.payload?.message;
      },
      error:'Failed to create Course'
    })
    
  } catch (error) {
    toast.error(error.message);
    
  }
})
const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(getAllCourses.fulfilled,(state,action)=>{
        //console.log(action.payload);
        if(action?.payload){
            state.courseList=[...action.payload];
        }
        console.log(state.courseList)
    })
  }

  

});

export default courseSlice.reducer;