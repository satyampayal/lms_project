import React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Footer from './Components/Footer';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
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
   </Routes>
  )
}

export default App