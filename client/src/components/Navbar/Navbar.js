import Link from 'next/link'
import React from 'react'
import {AiOutlineUser} from 'react-icons/ai'
function Navbar() {
  return (
    <div className='flex items-center justify-between px-2 lg:px-10'>
      <Link href={'/'}>
          <div className="flex cursor-pointer items-center p-3 w-32 lg:w-52 md:w-48 ">
              <img src="../logo.svg" />
          </div>
      </Link>
        <div className='bg-primary-500 rounded-full p-1 text-white cursor-pointer hover:shadow-md active:scale-95 transition-transform delay-150 ease-in-out'>
            <AiOutlineUser className=' w-6 h-6 lg:w-10 lg:h-10'/>
        </div>
    </div>
  )
}

export default Navbar