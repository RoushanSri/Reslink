import React from 'react'
import { FaRegBell } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

function Header() {
  return (
    <div className="w-full bg-white text-black p-4 md:px-16 flex justify-between items-center">
        <div className='flex items-center gap-4'>
            <div className='w-8 h-8 rounded-xl bg-gray-800 flex items-center justify-center'>
                <IoCartOutline size={20} color='white'/>
            </div>
            <h1 className="text-xl font-bold">Procurent Section</h1>
        </div>
        <div className='flex items-center gap-4 justify-center'>
            <div className='w-8 h-8 rounded-full flex items-center justify-center bg-gray-200'>
                <FaRegBell size={15}/>
            </div>
            <div className='rounded-full w-8 h-8 bg-gray-600'></div>
        </div>
    </div>
  )
}

export default Header
