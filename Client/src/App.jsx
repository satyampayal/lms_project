/* eslint-disable simple-import-sort/imports */
import {Route, Routes} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './layouts/Layout';
import CourseList from './pages/Course/CourseList';
import CreateCourse from './pages/Course/CreateCourse';
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

    {/* CreateCourse required Auth */}
    <Route path='/createcourse' element={<CreateCourse/>}/>
   </Routes>
  )
}

export default App