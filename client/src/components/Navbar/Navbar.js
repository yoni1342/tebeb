import React from 'react'
import {AiOutlineUser} from 'react-icons/ai'
function Navbar() {
  return (
    <div className='flex items-center justify-between px-10'>
        <div className="flex items-center p-3 w-52 md:w-48 ">
            <img src="../logo.svg" />
        </div>
        <div className='bg-primary-500 rounded-full p-1 text-white cursor-pointer hover:shadow-md active:scale-95 transition-transform delay-150 ease-in-out'>
            <AiOutlineUser className='w-10 h-10'/>
        </div>
    </div>
  )
}

export default Navbar