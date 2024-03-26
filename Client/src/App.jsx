/* eslint-disable simple-import-sort/imports */
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './layouts/Layout';
import CourseList from './pages/Course/CourseList';
import CreateCourse from './pages/Course/CreateCourse';
import CourseDescription from './pages/Course/CourseDescription';
import NotFound from './Components/NotFound';
import Denied from './pages/Denied';
import RequireAuth from './Components/Auth/RequireAuth';
import Profile from './pages/User/Profile';
import ChangePassword from './pages/User/ChangePassword'
import { useSelector } from 'react-redux';
import EditProfile from './pages/User/EditProfile';
import DisplayLectures from './pages/Course/DisplayLectures';
function App() {
  // useEffect(()=>{
  // //  toast.error('Hello',{
  // //   duration:10000,
  // //   position:'top-center'
  // //  })
  // toast.success('Confirm');
  // })

  const {isLoggedIn}=useSelector((state)=>state.auth);
  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/courses' element={<CourseList />} />
      <Route path='/course/:courseId' element={<CourseDescription />} />

      {/* CreateCourse required Auth */}
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path='course/create/' element={<CreateCourse />} />
      </Route>
      {
        isLoggedIn?
        <Route path='/me' element={<Profile/>} /> 
        :
      <Route path='/login' element={<Login />} />
      }
       {
        isLoggedIn?
        <Route path='/me/change-password' element={<ChangePassword/>} /> 
        :
      <Route path='/login' element={<Login />} />
      }
        {
        isLoggedIn?
        <Route path='/me/edit-profile' element={<EditProfile/>} /> 
        :
      <Route path='/login' element={<Login />} />
      }

      {/* Display Lecture Route */}
      {
        isLoggedIn?
        <Route path='/course/lectures/:courseId' element={<DisplayLectures/>} /> 
        :
      <Route path='/login' element={<Login />} />
      }
      
      <Route path='/denied' element={<Denied />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App