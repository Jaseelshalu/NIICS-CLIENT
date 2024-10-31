import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

const Admin = () => {
  return (
    <div className='w-screen h-screen flex'>
        <Sidebar/>
        <Outlet />
    </div>
  )
}

export default Admin