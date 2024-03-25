import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../redux/slices/courseSlice';
import toast from 'react-hot-toast';

function CreateCourse() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    let {data}=useSelector((state)=>state.auth);
    data=JSON.parse(data);
    //console.log(data.user.fullName);

    const [courseDetails, setCourseDetails] = useState({
        title: '',
        description: '',
        category: '',
        createdBy: data.user.fullName,
        thumbnail: '',

    });
    const [previewImage, setPreviewImage] = useState('');

    function handleDetails(e){
        e.preventDefault();

        const {name,value}=e.target;

        setCourseDetails({
            ...courseDetails,
            [name]:value
        })

    }

    function imageHandler(e) {
        e.preventDefault();


        const uploadImage = e.target.files[0];
        if (!uploadImage) return;
        setCourseDetails({
            ...courseDetails,
            thumbnail: uploadImage
        });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
        })

    }
    const createCourseHandler=async (e)=>{
        e.preventDefault();
        if(!courseDetails.title || !courseDetails.description || !courseDetails.category || !courseDetails.thumbnail  ){
            toast.error("All Field required");
            return;
        }
        if(courseDetails.title.length<8 || courseDetails.description.length<8){
            toast.error("Title and Description Length should be 8 Character");
            return;
        }
      
        // console.log(courseDetails.thumbnail);

        const response=await dispatch(createCourse(courseDetails));
        console.log(response);
    
        if(response){
            navigate('/');
        }
        // setCourseDetails({
        //     title: '',
        //     description: '',
        //     category: '',
        //     createdBy: '',
        //     thumbnail: '',
        // })
    }

    return (
            <HomeLayout>
                <div className='bg-gray-700 text-white  flex flex-col justify-center w-full m-b-3 cursor-default  '>
                    <h1 className='text-center text-bold  text-green-400 text-3xl'>Create Course by ADMIN </h1>

                    <form  onSubmit={createCourseHandler}
                     className='flex flex-col gap-2  w-[400px] p-4 m-auto  place-content-center border rounded-lg' >
                        <label htmlFor="image_uploads" className='cursor-pointer'>
                            {/* Image upload  */}

                            {previewImage ?
                                (<img src={previewImage}  className='mx-auto' />)
                                :
                                (<h1>Upload ThumbNail</h1>)
                            }
                        </label>
                        <input
                            type='file'
                            className='hidden'
                            name='image_uploads'
                            id='image_uploads'
                            accept='.jpeg,.png,.svg,.jpg'
                            onChange={imageHandler}

                        />
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name='title'
                            className='bg-gray-600 border rounded-lg p-3 '
                            placeholder='title...'
                            onChange={handleDetails}
                            value={courseDetails.title}
                        />
                        <label htmlFor="title">Description</label>
                        <input
                            type="text"
                            name='description'
                            className='bg-gray-600 border rounded-lg p-3 '
                            placeholder='description...'  
                            onChange={handleDetails}
                            value={courseDetails.description}

                        />
                        <label htmlFor="title">category</label>
                        <input
                            className='bg-gray-600 border rounded-lg p-3 '
                            type="text"
                            name='category'
                            placeholder='category...'
                            onChange={handleDetails}
                            value={courseDetails.category}

                        />
                        <button type='submit' className='bg-green-400 text-center p-4 rounded-lg font-bold text-2xl hover:bg-green-500 transition-all duration-200 ease-in' >Create Course</button>




                    </form>
                </div>
            </HomeLayout>
    )
}

export default CreateCourse