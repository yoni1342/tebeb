import React from 'react'
import Link from 'next/link'
function SidebarVideo({img, title, id}) {
  return (
    <Link href={`/video/${id}`}> 
      <div className='flex flex-col md:pl-5 lg:pl-0 lg:items-center cursor-pointer lg:space-x-3 lg:pr-10 py-3 group'>
      <div className='relative w-[90%] lg:w-[70%] rounded-2xl'>
          <div className='bg-black absolute w-full h-full opacity-20 rounded-xl'/>
          <img
              src="/play.icon.png"
              className="w-20 md:w-36 lg:w-20 absolute top-[20%] left-[38%] opacity-0 group-hover:opacity-100 transition duration-150 group-active:scale-95"
      />
          <img src={img} className=' object-cover w-[90rem] h-[8rem] md:h-[20rem] lg:h-[8rem]'/>
          {/* <div className='bg-primary-400 absolute top-[78%] left-[78%] text-white text-sm font-thin'>10:00</div> */}
      </div>
      <div>
          <p className=' text-black line-clamp-2 text-lg pr-3 lg:px-10 md:text-2xl lg:text-lg text-start'>{title}</p>
      </div>
    </div>
    </Link>
  )
}

export default SidebarVideo