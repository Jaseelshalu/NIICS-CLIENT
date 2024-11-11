import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

const Admin = () => {
  return (
    <div  className='grid h-screen w-screen lg:grid-cols-[200px_1fr] xl:grid-cols-[200px_1fr]'>
        <Sidebar/>
        <Outlet />
    </div>
  )
}

export default Admin