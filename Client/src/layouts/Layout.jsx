import React from 'react'
import Home from '../pages/Home'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <main>
       <Home/>  
       <Outlet/>  
    
    </main>
  )
}

export default Layout