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
        const { title, description, category, createdBy, thumbnail } = req.body;
        // console.log(req.User)

        // if(!title || !description || !category || !createdBy || !thumbnail ){
        // return next(new AppError('All field requireds', 400))
        // }

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: 'Dumm',
                secure_url: 'Dum'
            },
        });
        if (req.file) {
            const result = await v2.uploader.upload(req.file.path, {
                folder: 'lms',
            });
            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;

            }
            fs.rm(`uploads/${req.file.filename}`);
        }

        await course.save();
        res.status(200).json({
            success: true,
            message: 'Course Created SuccessFully',
            course
        })

    } catch (e) {
        return next(new AppError(e.message, 500))

    }
}

export const updateCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findByIdAndUpdate(
            courseId,
            {
                $set: req.body
            },
            {
                runValidator: true
            }
        )
        if (!course) {
            return next(new AppError('Course not Exists ', 400))

        }

        res.status(200).json({
            success: true,
            message: 'Course Updated SuccessFully',
            course
        })

    } catch (e) {
        return next(new AppError(e.message, 500))

    }
};

export const deletCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        await Course.findByIdAndDelete(courseId);

        res.status(200).json({
            success: true,
            message: 'Course Deleted SuccessFully',

        })

    } catch (e) {
        return next(new AppError(e.message, 500))

    }
};

export const addLectureToCourseById = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { courseId } = req.params;

        if (!title || !description) {
            return next(new AppError('All Fields are required', 500))
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return next(new AppError('Course are not exists', 500))
        }
        let lectureData = {
            public_id: "Dummy",
            secure_url: "Dummy"
        };
        if (req.file) {
            const result = await v2.uploader.upload(req.file.path, {
                folder: 'lms',
                resource_type:'video',
            });
            if (result) {
                lectureData.public_id = result.public_id;
                lectureData.secure_url = result.secure_url;

            }
            fs.rm(`uploads/${req.file.filename}`);
        }

        course.lectures.push({
            title,
            description,
            lecture: lectureData
        });
        course.numberOfLectures = course.lectures.length;
        await course.save();


        res.status(200).json({
            success: true,
            message: 'lectures Added  SuccessFully',
            course
        })

    } catch (e) {
        return next(new AppError(e.message, 500))

    }
};

export const deleteLectureByCourseIdAndLectureId = async (req, res, next) => {
    const { courseId, lectureId } = req.query;
    console.log(lectureId.toString());
    try {
        if (!courseId) {
            return next(new AppError('Course Id Is required ', 404))
        }
        if (!lectureId) {
            return next(new AppError('Lecture Id Is required ', 404))
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return next(new AppError('Course are not exists ', 404))
        }
        // find the index of the lectured using the lectureId
        const lectureIndex=course.lectures.findIndex(
            (lecture)=>{
               // console.log( lecture);
            return lecture._id.toString()===lectureId.toString();
        });
        if(lectureIndex===-1){
            return next(new AppError('Lecture does not exists ', 404))
        }
        // lectureIndex=0;
        // Delete the lecure from Cloudinary
        await v2.uploader.destroy(
            course.lectures[lectureIndex].lecture.public_id,
            {
                resource_type:'video',
            }
        );
        // remove the lectures from the array
        course.lectures.splice(lectureIndex,1);

        // update the number of lectures based on lectures array length
        course.numberOfLectures=course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture deleted Successfully",
            course
        })
    }
    catch (e) {
        return next(new AppError(e.message, 500))

    }
}