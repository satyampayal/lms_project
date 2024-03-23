/* eslint-disable simple-import-sort/imports */
import {Route, Routes} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './layouts/Layout';
import CourseList from './pages/Course/CourseList';
import CreateCourse from './pages/Course/CreateCourse';
import CourseDescription from './pages/Course/CourseDescription';
import NotFound from './Components/NotFound';
import Denied from './pages/Denied';
import RequireAuth from './Components/Auth/RequireAuth';
function App() {
  // useEffect(()=>{
  // //  toast.error('Hello',{
  // //   duration:10000,
  // //   position:'top-center'
  // //  })
  // toast.success('Confirm');
  // })
  return (
   <Routes>
    <Route path='/' element={<Layout/>} />
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/courses' element={<CourseList/>}/>
    <Route path='/course/description' element={<CourseDescription/>} />

    {/* CreateCourse required Auth */}
    <Route element={<RequireAuth  allowedRoles={["ADMIN"]}/>}>
    <Route path='/course/create' element={<CreateCourse/>}/>
    </Route>
<Route  path='/denied' element={<Denied/>}/>
    <Route  path='*' element={<NotFound/>}/>
   </Routes>
  )
}

export default App