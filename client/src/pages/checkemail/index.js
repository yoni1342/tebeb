import React from 'react'
import Image from 'next/image'
function index() {
  return (
    <div className=" min-h-screen bg-gradient-to-t from-[#fbfbf2] to-[#fbfbf2] opacity-70">
			<div className="flex items-center p-3 w-52 md:w-48 ">
				<img src="./logo.svg" />
			</div>
      <div className='flex flex-col items-center justify-center'>
        <Image src='/email.png' width={200} height={200} />
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold'>Verify Your Email</h1>
            <p>We sent verfication link to your email please go to your email and verify your email </p>
        </div>
      </div>
    </div>
  )
}

export default index