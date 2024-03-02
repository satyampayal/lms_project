import { Router } from "express";
import { getAllCourses, getLecturesByCourseId, deletCourse, createCourse, updateCourse, addLectureToCourseById, deleteLectureByCourseIdAndLectureId } from "../controller/course.controller.js";
import { isLoggedIn, authorizedRoles } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const router = Router();

router
   .route('/')
   .get(getAllCourses)
   .post(isLoggedIn,
      authorizedRoles('ADMIN'),
      upload.single('thumbnail'),
      createCourse)
   .delete(isLoggedIn,
      authorizedRoles('ADMIN'),
      deleteLectureByCourseIdAndLectureId);

router
   .route('/:courseId')
   .get(isLoggedIn, getLecturesByCourseId)
   .put(isLoggedIn,
      authorizedRoles('ADMIN'),
      updateCourse)
   .delete(isLoggedIn,
      authorizedRoles('ADMIN'),
      deletCourse
   )
   .post(isLoggedIn,
      authorizedRoles('ADMIN'),
      upload.single('lecture'),
      addLectureToCourseById,
   );



export default router;
