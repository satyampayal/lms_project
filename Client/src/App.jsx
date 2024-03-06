import React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
function App() {
  useEffect(()=>{
  //  toast.error('Hello',{
  //   duration:10000,
  //   position:'top-center'
  //  })
  toast.success('Confirm');
  })
  return (
    <div className='text-6xl'>This is starting</div>
  )
}

export default App