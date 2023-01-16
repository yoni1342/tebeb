// import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Questions from '../../components/Question/Questions';
import SideBar from '../../components/SideBar'
import Navbar from '../../components/Navbar/Navbar'
import {axios} from '../../axios'
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
        axios.get(`/video/${query.id}`,{
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
        <Navbar />
        <main className='lg:flex items-start'>
            <div className=' lg:flex-[75%] flex flex-col justify-center lg:p-10'>
                <video src={`http://localhost:9000/api/video/${query.id}/play`} controls  className='outline-none' />
                <div className='py-8 px-2 text-xl md:text-2xl font-semibold text-primary-500'>
                  {data?.title}
                </div>
                <div>
                  <Questions type="video" id= {data?._id}/>
                </div>
            </div>
            <div className='lg:flex-[25%]'>
                <SideBar playlist_id = {data?.playlist_id} video_id = {query.id}/>
            </div>
        </main>
    </div>
  )
}

export default video