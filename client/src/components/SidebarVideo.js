import React from 'react'
import Link from 'next/link'
function SidebarVideo({img, title, id}) {
  return (
    <Link href={`/video/${id}`}> 
      <div className='flex items-center space-x-5 pr-10 py-3 group'>
      <div className='w-[50%] relative'>
          <div className='bg-black absolute w-full h-full opacity-20'/>
          <img
              src="/play.icon.png"
              className="w-14 absolute top-[20%] left-[30%] opacity-0 group-hover:opacity-100 transition duration-150 group-active:scale-95"
      />
          <img src={img}/>
          {/* <div className='bg-primary-400 absolute top-[78%] left-[78%] text-white text-sm font-thin'>10:00</div> */}
      </div>
      <div>
          <p className='text-lg'>{title}</p>
      </div>
    </div>
    </Link>
  )
}

export default SidebarVideo