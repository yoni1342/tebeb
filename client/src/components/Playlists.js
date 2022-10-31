import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
function Subject({image, name, id, desc, date}) {
  
  return (
    <div class="flex justify-center md:h-60" >
      <Link href={`/courses/${id}`}>      
        <div class="flex flex-col md:flex-row md:max-w-5xl rounded-lg bg-white shadow-md  hover:shadow-lg cursor-pointer active:scale-95 transition-transform ease-in-out delay-150">
          <img class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={image} alt="" />
          <div class="p-6 flex flex-col justify-start">
            <h5 class="text-gray-900 text-xl font-medium mb-2">{name}</h5>
            <p class="text-gray-700 text-base mb-4">
              {desc}
            </p>
            <p class="text-gray-500 text-xs">Last updated { new Date(date).toDateString()}</p>
          </div>
        </div>
      </Link>
  </div>
  )
}

export default Subject