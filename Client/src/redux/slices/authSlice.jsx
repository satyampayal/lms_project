//isLoggedIn state is dynamic so it store in localStorage

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../config/AxiosIns";

// for on Refresh not  go anyWhere
const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  role: localStorage.getItem('role') || '',
  data: localStorage.getItem('data') || {},
}
// crete account/ user 
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {

    const response = axiosInstance.post("user/register", data);
    toast.promise(response, {
      loading: 'wait creating your account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'failed to create your account'
    })
    return await response;

  } catch (error) {
    // console.log(error);
    toast.error(error.message);

  }
})

// login account

export const loginAccount = createAsyncThunk('/auth/login', async (data) => {
  try {

    const response = axiosInstance.post('user/login', data);
    toast.promise(response, {
      loading: 'wait for verfication account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to authenticate your account'
    })
    return await response;



  } catch (error) {
    toast.error(error?.response?.data?.message);


  }

})
// logout account
export const logout = createAsyncThunk('auth/logout', async () => {
  try {

    const response = axiosInstance.get("user/logout");
    toast.promise(response, {
      loading: 'wait for logout your account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'failed to logout your account'
    })
    return await response;

  } catch (error) {
    // console.log(error);
    toast.error(error.message);

  }

})


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.fulfilled, (state, action) => {
        console.log(action)
        localStorage.setItem('data', JSON.stringify(action?.payload?.data));
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', action?.payload?.data?.user?.role);
        state.isLoggedIn =localStorage.getItem('isLoggedIn');
        console.log(state.isLoggedIn);
        state.role = action?.payload?.data?.user?.role;
        state.data = action?.payload?.data;
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log(action)
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = '';
        state.data = {};
      })
  }

});

export default authSlice.reducer;