//isLoggedIn state is dynamic so it store in localStorage

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../config/AxiosIns";

// for on Refresh not  goed anyWhere
const initialState={
    isLoggedIn:localStorage.getItem('isLoogedIn')||false,
    role:localStorage.getItem('role')  || '',
    data:localStorage.getItem('data') || {},
}
export const createAccount=createAsyncThunk("/auth/signup",async (data)=>{
  try {

    const response=axiosInstance.post("user/register",data);
    toast.promise(response,{
        loading:'wait creating your account',
        success:(data)=>{
            return data?.data?.message;
        },
        error:'failed to create your account'
    })
    return await response;
    
  } catch (error) {
   // console.log(error);
    toast.error(error?.response?.data?.message);
    
  }
})
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
  
});

export default authSlice.reducer;