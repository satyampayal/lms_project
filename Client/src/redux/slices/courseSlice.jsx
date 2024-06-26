import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../config/AxiosIns";

const initialState = {
  courseList: [],
  load:false,
}


// get all courses 

export const getAllCourses = createAsyncThunk('/course/getAllCourses', async () => {

  try {
    const response = axiosInstance.get('/courses');

    toast.promise(response, {
      loading: 'wait fetching all courses',
      success: (data) => {
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
export const createCourse = createAsyncThunk('/course/createCourse', async (data) => {

  try {
    console.log(data)
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("createdBy", data.createdBy);
    formData.append("thumbnail", data.thumbnail);
    const response = axiosInstance.post('/courses', formData);

    toast.promise(response, {
      loading: 'wait for create Course',
      success: (data) => {
        return data?.payload?.message;
      },
      error: 'Failed to create Course'
    })
    return (await response).data;


  } catch (error) {
    toast.error(error.message);

  }

})

// Delete course 

export const deleteCourse = createAsyncThunk('/course/deleteCourse', async () => {



  try {
    const url = location.href.split('/');
    const courseId = url.splice(4);
    console.log(courseId);
    const response = axiosInstance.delete(`/courses/${courseId}`);

    toast.promise(response, {
      loading: 'wait for delete course',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'failed to delete  courses'

    })
    return (await response).data;

  } catch (error) {
    toast.error(error.message);

  }

});

// get all lectures of particular course

export const getLectures = createAsyncThunk('/course/get/lecture', async () => {
  try {
    const url = location.href.split('/');
    const courseId = url.splice(5);
    console.log(courseId)
    const response = axiosInstance.get(`/courses/${courseId}`);
    toast.promise(response, {
      loading: 'wait for get lecture',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'failed to get  lecture'

    })
    return (await response).data;
  } catch (error) {
    toast.error(error.message);

  }
})

// Add lecture 

export const addLecture = createAsyncThunk('/course/add/lecture', async (data) => {
  try {
    const url = location.href.split('/');
    const courseId = url.splice(5);

    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('lecture', data.lecture);
    const response = axiosInstance.post(`/courses/${courseId}`, formData);

    toast.promise(response, {
      loading: 'wait for Add lecture',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'failed to Add  lecture'

    })
    return (await response).data;

  } catch (error) {
    toast.error(error.message);

  }
})
// delete lecture

export const deleteLecture = createAsyncThunk('/course/delete/lecture', async () => {

  try {
    let url = location.href.split('/');
    // console.log(url);
    url = url[4].split('?');
    console.log(url);

    // const response=axiosInstance.delete(`/courses?courseId=${url[5]}&lectureId=${url[6]}`);
    const response = axiosInstance.delete(`/courses?${url[1]}`);

    toast.promise(response, {
      loading: 'wait for lecture delete',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'failed to delete lecture'
    })
    return (await response).data;

  } catch (error) {
    toast.error(error.message);

  }
})
// unLogin user can watch lecture 30% of width with limit 10lectures or full
export const freeLectureOnly=createAsyncThunk('/get/free/lectures',async ()=>{

  try {
    const url = location.href.split('/');
    const courseId = url.splice(5);
    console.log(courseId)
    const response = axiosInstance.get(`/courses/free/${courseId}`);
    toast.promise(response, {
      loading: 'wait for get lecture',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'failed to get  lecture'

    })
    const res=(await response).data;
   
    // res.lectures={...lectArray};
    console.log(res.lectures)
    if(res.lectures.length>0)
    res.lectures=[res.lectures[0]];
   // console.log(res);

    
    return res;
  } catch (error) {
    toast.error(error.message);

  }
})


const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.fulfilled, (state, action) => {
        //console.log(action.payload);
        if (action?.payload) {
          state.courseList = [...action.payload];
          state.load=true;
        }
        //console.log(state.courseList)
      })
      // .addCase(deleteCourse.fulfilled, (state,action)=>{
      //   if(action?.payload){
      //     getAllCourses
      //   }

      // })

  }



});

export default courseSlice.reducer;