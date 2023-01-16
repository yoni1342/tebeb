import Link from 'next/link'
import React from 'react'
import {BsFillPlayFill} from 'react-icons/bs'


function Hero() {
  return (
    <div className='flex flex-col-reverse lg:flex-row items-center min-h-screen'>
				<div className='lg:py-10 px-10'>
					<h1 className='text-6xl font-semibold'>
					Lorem ipsum dolor sit amet, consectetur adipiscing <span className='text-primary-500'>elit.</span>
					</h1>
					<p className='text-xl my-7 text-gray-600'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, adipiscing elit. Nunc vulputate libero et velit interdum, adipiscing elit. Nunc vulputate libero et velit interdum, 
					</p>
					<div className='flex items-center space-x-3'>
						<Link href={'/courses'}>
							<div className='bg-primary-500 text-white text-center p-3 text-2xl rounded-3xl cursor-pointer hover:shadow-md active:scale-95 transition-transform duration-150 ease-in-out'>
							Get Started
							</div>
						</Link>
						<div className='flex items-center bg-white text-center p-4 text-2xl rounded-3xl cursor-pointer hover:shadow-md active:scale-95 transition-transform duration-150 ease-in-out space-x-4'>
							<div className='text-primary-500 rounded-full shadow-md flex items-center'>
								<BsFillPlayFill  className='w-10 h-10' />
							</div>
							<div>
								Watch Video
							</div>
						</div>
					</div>

				</div>
				<img src='/Hero.png' />
			</div>
  )
}

export default Hero