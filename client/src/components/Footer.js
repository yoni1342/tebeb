import React from 'react'
import {BsFacebook, BsInstagram} from 'react-icons/bs'
function Footer() {
  return (
    <footer className='bg-primary-500 w-full p-5 h-40 text-white flex flex-col lg:flex-row justify-evenly items-center'>
        <div className=' text-lg lg:text-3xl'>
            &#169; All Rights Are Reserved
        </div>
        <div className='flex text-xl lg:text-3xl space-x-8'>
            <BsFacebook />
            <BsInstagram />
        </div>
    </footer>
  )
}

export default Footer