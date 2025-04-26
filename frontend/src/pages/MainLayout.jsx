import React from 'react'
import Header from '../components/Header.jsx'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="w-full h-full bg-gray-50flex flex-col font-poppins">
        <Header/>
      <div className="flex-grow p-4">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
