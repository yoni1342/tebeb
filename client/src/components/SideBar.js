import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SidebarVideo from './SidebarVideo'

const ISSERVER = typeof window === "undefined";

function SideBar({playlist_id}) {
  const [data, setData] = useState([])
  useEffect(()=>{
		if(!ISSERVER){
			const user  = localStorage.getItem("user")
			if (!user){
				window.location.replace('/signin')
      			}
				const token = JSON.parse(user).token
				if(!token){
					window.location.replace('/signin')
				}
			
			const headers = {
			  'Content-Type': 'application/json',
			  'access_token': token
			}
			
      axios.get(`http://localhost:9000/api/playlist/${playlist_id}/`,{
        headers: headers
      }).then((res)=>{
        const data = res?.data?.result?.playlist
        setData(data)
      }).catch((err)=>
      console.log(err))
			
		}
	},[playlist_id])
  return (
    <div>
      {
        data?.chapters?.map((chap)=>(
        <div className='pt-10'> 
          <p  className='text-primary-500 text-lg font-bold pl-3'><span>Chapter {chap.number}</span> {chap.title
}</p> 
          <div className='pl-5 lg:pl-0 flex flex-col justify-center items-center'>
                {
                  chap.videos.map((vid)=>(
                    <SidebarVideo id={vid._id} img={vid.thumbnail_path} title = {vid.title} key={vid._id} />
                  ))
                }
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default SideBar