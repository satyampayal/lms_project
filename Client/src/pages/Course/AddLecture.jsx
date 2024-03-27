import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLecture } from '../../redux/slices/courseSlice';

function AddLecture() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [previewVideo, setPreviewVideo] = useState('');
    const [lectureDetails, setLectureDetails] = useState({
        title: '',
        description: '',
        lecture: '',
    })
    const handleInput = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        setLectureDetails({
            ...lectureDetails,
            [name]: value
        })
    }
    const handleVideo = (e) => {
        e.preventDefault();

        const uploadVideo = e.target.files[0];
        // if(!uploadVideo){
        //     return;
        // }
        setLectureDetails({
            ...lectureDetails,
            lecture: uploadVideo
        })
        console.log(lectureDetails.lecture);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadVideo);
        fileReader.addEventListener("load", function () {
            setPreviewVideo(this.result);
        })

    }
    const lectureSubmitHandler=async (e)=>{
        e.preventDefault();
      
        const response=await dispatch(addLecture(lectureDetails));
        console.log(response);
        if(response){
            setLectureDetails({
                title: '',
                description: '',
                lecture: '',
            })
            navigate('/');
        }


    }
    return (
        <HomeLayout>
            <div className='bg-gray-500 min-h-[81.5vh] flex justify-center items-center'>
                <form  onSubmit={lectureSubmitHandler}
                className='bg-slate-100 w-[60vw] h-[70vh] rounded-lg 
                flex flex-col gap-2 justify-center items-center p-2' >
                    <div className=' bg-green-300 rounded-lg min-w-[40vw] min-h-[40vh]
                     cursor-pointer '>
                        {/* Video Option */}

                        {
                            previewVideo === '' ? (
                                <label htmlFor="upload_video" className='  text-center w-[100%] h-[49vh] flex justify-center items-center' >upload Video</label>

                            ) :
                                <video src={previewVideo} className='w-full h-full bg-blue-300 p-2' controls></video>

                        }
                        <input type="file"
                            name="upload_video"
                            id="upload_video"
                            className='hidden'
                            accept='.mp4'
                            onChange={handleVideo}
                        />

                    </div>
                    <div >
                        <label htmlFor="">Title:</label>
                        <input type="text"
                        name='title'
                            onChange={handleInput}
                            placeholder='Please enter Title of lecture'
                            value={lectureDetails.title}
                            className='p-2 rounded-md text-start bg-blue-200 w-[35vw]'
                        />
                    </div>
                    <div>
                        <label htmlFor="">Description:</label>
                        <input type="text"
                        name='description'
                            onChange={handleInput}
                            placeholder='Please enter decription of lecture'
                            value={lectureDetails.description}
                            className='p-2 rounded-md text-start bg-blue-200 w-[33vw]'
                        />
                    </div>
                    <button type='submit ' className=' w-full rounded-lg p-2 font-bold text-white bg-green-400 hover:bg-green-600 transition-all duration-200 ease-in'>Add lecture</button>

                </form>

            </div>

        </HomeLayout>
    )
}

export default AddLecture