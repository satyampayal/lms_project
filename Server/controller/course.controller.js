import Course from "../models/course.model.js"
import AppError from "../utils/appError.js"
import { v2 } from "cloudinary";
import fs from 'fs/promises';

export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lectures');
        res.status(200).json({
            success: true,
            message: 'All Courses',
            courses,
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

export const getLecturesByCourseId = async (req, res, next) => {

    try {
        const { courseId } = req.params;
        //   console.log(courseId);
        const course = await Course.findById(courseId);
        if (!course) {
            return (
                new AppError('Invalid Course Id', 400)
            )
        }
        res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully ',
            lectures: Course.lectures,
        })

    } catch (e) {
        return (
            new AppError('Invalid Course Id', 400)
        )
    }

}

export const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, createdBy,thumbnail } = req.body;

        // if(!title || !description || !category || !createdBy || !thumbnail ){
        // return next(new AppError('All field requireds', 400))
        // }

        const course=await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail:{
                public_id:'Dumm',
                secure_url:'Dum'
            },
        });
        if(req.file){
          const result= await  v2.uploader.upload(req.file.path,{
            folder:'lms',
          });
          if(result){
            course.thumbnail.public_id=result.public_id;
            course.thumbnail.secure_url=result.secure_url;

          }
          fs.rm(`uploads/${req.file.filename}`);
        }

        await course.save();
        res.status(200).json({
            success:true,
            message:'Course Created SuccessFully',
            course
        })

    } catch (e) {
        return next(new AppError(e.message, 500))

    }
}

export const updateCourse = async (req, res, next) => {
    try {
            const {courseId}=req.params;
            const course=await Course.findByIdAndUpdate(
                courseId,
                {
                    $set:req.body
                },
                {
                    runValidator:true
                }
            )
           if(!course){
        return next(new AppError('Course not Exists ', 400))

           }

           res.status(200).json({
            success:true,
            message:'Course Updated SuccessFully',
            course
           })

    } catch (e) {
        return next(new AppError(e.message, 500))

    }
}

export const deletCourse = async (req, res, next) => {
    try {
        const {courseId}=req.params;
        await Course.findByIdAndDelete(courseId);
       
        res.status(200).json({
            success:true,
            message:'Course Deleted SuccessFully',
           
           })

    } catch (e) {
        return next(new AppError(e.message, 500))

    }
}