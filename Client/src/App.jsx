import React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Footer from './Components/Footer';
function App() {
  useEffect(()=>{
  //  toast.error('Hello',{
  //   duration:10000,
  //   position:'top-center'
  //  })
  toast.success('Confirm');
  })
  return (
    <div >
      <Footer/>

    </div>
  )
}

export default App