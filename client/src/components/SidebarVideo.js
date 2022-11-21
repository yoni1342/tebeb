import React from 'react'
import Link from 'next/link'
function SidebarVideo({img, title, id}) {
  return (
    <Link href={`/video/${id}`}> 
      <div className='flex flex-col items-center cursor-pointer space-x-3 pr-10 py-3 group'>
      <div className='relative w-[70%]'>
          <div className='bg-black absolute w-full h-full opacity-20'/>
          <img
              src="/play.icon.png"
              className="w-14 absolute top-[20%] left-[30%] opacity-0 group-hover:opacity-100 transition duration-150 group-active:scale-95"
      />
          <img src={img} className=' object-cover w-[90rem] h-[6rem]'/>
          {/* <div className='bg-primary-400 absolute top-[78%] left-[78%] text-white text-sm font-thin'>10:00</div> */}
      </div>
      <div>
          <p className=' text-black line-clamp-2 text-sm px-10'>{title}</p>
      </div>
    </div>
    </Link>
  )
}

export default SidebarVideo