import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Questions from '../../components/Questions';
import SideBar from '../../components/SideBar'
const ISSERVER = typeof window === "undefined";

function video() {
	const [data, setData] = useState()
  const router = useRouter()
	const { query } = router

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
      if(router.isReady){
        axios.get(`http://localhost:9000/api/video/${query.id}`,{
          headers:headers
        }).then((res)=>{
				  const data = res?.data?.result?.video
				  setData(data)
				}).catch((err)=>
				console.log(err))
      }
    }
  },[query])

  return (
    <div className=" min-h-screen">
        <div className="flex items-center p-3 w-52 md:w-48 ">
				<img src="../logo.svg" />
		</div>
        <main className='lg:flex items-start'>
            <div className=' lg:flex-[75%] flex flex-col justify-center lg:p-10'>
                <video src={`http://localhost:9000/api/video/${query.id}/play`} controls  className='w-full outline-none' />
                <div className='py-8 px-2 text-2xl font-semibold text-primary-500'>
                  {data?.title}
                </div>
                <div>
                  <Questions type="video" id= {data?._id}/>
                </div>
            </div>
            <div className='lg:flex-[25%]'>
                <SideBar playlist_id = {data?.playlist_id}/>
            </div>
        </main>
    </div>
  )
}

export default video