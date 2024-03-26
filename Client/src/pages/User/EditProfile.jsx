import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateProfile } from '../../redux/slices/authSlice';

function EditProfile() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // let { data } = useSelector((state) => state.auth);
   // data = JSON.parse(data);
    // console.log(data);
    let data=localStorage.getItem('data');
      data = JSON.parse(data);
    console.log(data);
    const [editDetails, setEditDetails] = useState({
        fullName: '',
        avatar: ''
    });
    const [previewImage, setPreviewImage] = useState('');

    const handleUserInput = (e) => {
        e.preventDefault();

        setEditDetails({
            ...editDetails,
            fullName:e.target.value
        })

    }
    // Image handle
    const imageHandle = (e) => {
        e.preventDefault();
        const uploadImage = e.target.files[0];
        setEditDetails({
            ...editDetails,
            avatar: uploadImage
        });

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
        })


    }
    const editSubmitHandler= async (e)=>{
        e.preventDefault();
        if(editDetails.fullName==='' || editDetails.avatar==='' ){
            return toast.error('please upadte avatar or name');
        }

        let formdata=new FormData();
        formdata.append('fullName',editDetails.fullName);
        formdata.append('avatar',editDetails.avatar);
        const response=await  dispatch(updateProfile(formdata));
        console.log(response);
        if(response){
            navigate('/me');
            setEditDetails({
                fullName: '',
                avatar: ''
            })
        }
        
    }

    return (
        <HomeLayout>
            <div className='bg-gray-600 flex justify-center items-center min-h-[81vh] select-none '>
                <div >
                    <form onSubmit={editSubmitHandler}
                    className=' p-2 lg:md:w-[40vw] w-[80vw] min-h-[30vh] rounded-lg bg-gray-50 
                    flex flex-col justify-center items-center gap-5'  >
                        <label htmlFor="upload_avatar" className='cursor-pointer'>
                            {
                                previewImage === '' ?
                                    <img
                                        className='w-24 h-24 rounded-full  p-[2px] bg-red-400'
                                        src={data?.user?.avatar?.secure_url} alt="avatar"
                                    />
                                    :
                                    <img
                                        className='w-24 h-24 rounded-full p-[2px] bg-red-400'
                                        src={previewImage} alt="avatar"
                                    />
                            }
                        </label>
                        <input
                            className='hidden'
                            type="file"
                            name="upload_avatar"
                            id="upload_avatar"
                            accept='.jpeg,.png,.svg,.jpg'
                            onChange={imageHandle}
                        />
                        <div className='  '>
                            <label htmlFor="" className='text-green-400 font-bold lg:md:text-[20px] sm:text-[18px]  text-[14px] '>Full Name:</label>
                            <input
                                className='p-2 rounded-md text-start bg-blue-100 lg:md:w-[25vw] sm:w-[40vw]  w-[30vw] '
                                type="text"
                                placeholder='Enter Full name please...'
                                value={editDetails.fullName}
                                onChange={handleUserInput}
                            />
                        </div>

                        <button type='submit'
                            className=' text-white font-bold w-full p-2 rounded-md
                              bg-green-400 hover:bg-green-500 transition-all duration-200 ease-in'
                        >
                            Update Profile
                        </button>


                    </form>
                </div>

            </div>

        </HomeLayout>
    )
}

export default EditProfile