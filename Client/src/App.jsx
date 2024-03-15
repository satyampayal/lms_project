import React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Footer from './Components/Footer';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import HomeLayout from './layouts/HomeLayout';
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
    <Route path='/' element={<Home/>} />
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
   </Routes>
  )
}

export default App