import {configureStore} from '@reduxjs/toolkit';
import courseReducer from './slices/courseSlice';
import authReducer from './slices/authSlice';
const store=configureStore({
    reducer:{
        auth:authReducer,
        course:courseReducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false}),
    devTools:true
});

export default store;