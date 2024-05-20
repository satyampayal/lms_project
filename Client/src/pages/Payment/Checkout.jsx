import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from '../../redux/slices/razorPaySlice';
import toast from 'react-hot-toast';
function Checkout() {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const razorpayKey=useSelector((state)=>state?.razorpay?.key);
    const subscription_id=useSelector((state)=>state?.razorpay?.subscription_id);
    const {isPaymentVerified}=useSelector((state)=>state?.razorpay);
    const userData=useSelector((state)=>state?.auth?.data)


    const paymentDetails={
        razorpay_payment_id:"",
        razorpay_subscription_id:"",
        razorpay_signature:"",
    }
    async function load(){

        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());


    }

    async function handleSubscription(e){
        e.preventDefault();
        console.log(subscription_id);
        console.log("Razor Pay Key"+razorpayKey);
        
        if(!razorpayKey || !subscription_id ){
         toast.error("Something in handleSunscription went wrong");
         return;
        }
        const options= {
            key:razorpayKey,
            subscription_id: subscription_id,
            name:"Course Pvt.ltd",    
            description:"Subscription",
            handler:async function(response){
                alert(response.razorpay_signature);
                paymentDetails.razorpay_payment_id=response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id=response.razorpay_subscription_id;
                paymentDetails.razorpay_signature=response.razorpay_signature;
                toast.success('Payment Successfull');

                // verfying payment Details
                console.log(paymentDetails);
                const res=await dispatch(verifyUserPayment(paymentDetails));
                res?.payload?.success ? navigate('/checkout/success') :navigate('/checkout/fail');
            }
        };

        const paymentObject= new window.Razorpay(options);
        paymentObject.open();

    }

    useEffect(()=>{
        load();
    },[])
    // useEffect(() => {
    //     (async () => {
    //        await dispatch(getRazorPayId());
    //       await dispatch(purchaseCourseBundle());
    //     })();
    //   }, []);

  return (
    <div className=' h-[100vh] flex justify-center items-center'>
        <div>
            <form onSubmit={handleSubscription}>
                <button type='submit' className='w-full bg-yellow-300 p-2 rounded-md'>buy now</button>
            </form>
        </div>
    </div>
  )
}

export default Checkout