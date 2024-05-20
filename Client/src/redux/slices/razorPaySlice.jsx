import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/AxiosIns";
import toast from 'react-hot-toast'
const initialState = {
    key: '',
    subscription_id: '',
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: {}
};

export const getRazorPayId = createAsyncThunk('/razorpay/getId', async () => {
    try {
        const response = await axiosInstance('/payments/razorpay-key');
        return response.data;
    } catch (error) {
        toast.error('Failed to load data');
    }
});

export const purchaseCourseBundle = createAsyncThunk('/purchasecourse', async () => {
    try {
        const response = await axiosInstance.post('/payments/subscribe');
        return response.data;
    } catch (error) {
        toast.error('Failed to load data');
    }
});

export const verifyUserPayment = createAsyncThunk('/payments/verify', async (data) => {
    try {
        const response = await axiosInstance.post('/payments/verify',{
          razorpay_payment_id:data.razorpay_payment_id,
          razorpay_subscription_id:data.razorpay_subscription_id,
          razorpay_signature:data.razorpay_signature,

        });
        return response.data;
    } catch (error) {
        toast.error('Failed to load data');
    }
});

export const getPaymentRecord = createAsyncThunk('/payments/record', async () => {
    try {
        const response = await axiosInstance.get('/payments?count=100');
        toast.promise(response,{
            loading:"Geeting the payment record",
            success:(data)=>{
                return  data?.data?.message
            },
            error:'Failed to get payment record'
        })
        return (await response).data;
    } catch (error) {
        toast.error('opertion Failed ');
    }
});

export const cancelCourseBundle = createAsyncThunk('/payments/cancel', async () => {
    try {
        const response = await axiosInstance.get('/payments/unsubscribe');
        toast.promise(response,{
            loading:"unSubscribing Bundle",
            success:(data)=>{
                return  data?.data?.message
            },
            error:'Failed to Unsubscribe'
        })
        return (await response).data;
    } catch (error) {
        toast.error(' Failed to unsubscribe');
    }
});

const razorPaySlice = createSlice({
    name: 'razorpay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getRazorPayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key;
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                console.log("Subscription Id "+action);
                state.subscription_id = action?.payload?.subscription_id;
            }) 
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                     toast.success(action?.payload?.mesage);
                     state.isPaymentVerified=action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.error(action?.payload?.mesage);

                state.isPaymentVerified = action?.payload?.subscription_id;
            }) 
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                     toast.success(action?.payload?.mesage);
                     state.allPayments=action?.payload?.allPayments;
                     state.finalMonths=action?.payload?.finalMonths;
                     state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
            })
          
    }
})

export default razorPaySlice.reducer;
