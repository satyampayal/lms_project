import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../config/AxiosIns";

const initialState = {
     courseList:[]
}


// get all courses 

export const getAllCourses = createAsyncThunk('/course/getAllCourses', async () => {

  try {
  const response = axiosInstance.get('/courses');

  toast.promise(response,{
    loading:'wait fetching all courses',
    success:(data)=>{
       return data?.data?.message;
    },
    error: 'failed to get  courses'

  })
  return (await response).data.courses;

  } catch (error) {
    toast.error(error.message);
    
  }

})

// Crete Cousres by admin
export const createCourse=createAsyncThunk('/course/createCourse',async (data)=>{
 
  try {
    console.log(data)
    let formData=new FormData();
    formData.append("title",data.title);
    formData.append("description",data.description);
    formData.append("category",data.category);
    formData.append("createdBy",data.createdBy);
    formData.append("thumbnail",data.thumbnail);
  const response=axiosInstance.post('/courses',formData);

    toast.promise(response,{
      loading:'wait for create Course',
      success:(data)=>{
        return data?.payload?.message;
      },
      error:'Failed to create Course'
    })
  return (await response).data;

    
  } catch (error) {
    toast.error(error.message);
    
  }

})

// Delete course 

export const deleteCourse = createAsyncThunk('/course/deleteCourse', async () => {



  try {
    
  const response = axiosInstance.delete(`/courses/${courseId}`);

  

  toast.promise(response,{
    loading:'wait for delete course',
    success:(data)=>{
       return data?.data?.message;
    },
    error: 'failed to delete  courses'

  })
  return (await response);

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