//isLoggedIn state is dynamic so it store in localStorage

import { createSlice } from "@reduxjs/toolkit"

// for on Refresh not  goed anyWhere
const initialState={
    isLoggedIn:localStorage.getItem('isLoogedIn')||false,
    role:localStorage.getItem('role')  || '',
    data:localStorage.getItem('data') || {},
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{}
});

export default authSlice.reducer;