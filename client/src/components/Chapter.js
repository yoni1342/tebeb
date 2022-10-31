import React, { useEffect, useState } from 'react'
import Thumbnail from './Thumbnail'
import  { Component } from "react";
import Slider from "react-slick";
import axios from 'axios';
const ISSERVER = typeof window === "undefined";

export default function Chapter({number, title, videos}) {

  // const [video, setVideo] = useState([])
    // useEffect(()=>{
    //   videos.map((video)=>{
    //     if(!ISSERVER){
    //       const user  = localStorage.getItem("user")
    //       const token = JSON.parse(user).token
          
    //       const headers = {
    //         'Content-Type': 'application/json',
    //         'access_token': token
    //       }
          
    //       axios.get(`http://localhost:9000/api/video/${video}`,{
    //         headers: headers
    //       }).then((res)=>{
    //         const data = res?.data?.result?.video
    //         setVideo(prev=>[...prev, data])
    //       }).catch((err)=>
    //       console.log(err))
          
    //     }
    //   })
    // },[videos])
    // console.log(video)
        const settings = {
            dots: true,
            infinite: false,
            lazyLoad: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };
      return (
        <div >
            <div className=' text-3xl space-y-2 text-primary-500 p-10'>
                <h2>Chapter {number}</h2>
                <h3 className='text-2xl'>{title}</h3>
            </div>
            <div className='bg-[#e6dddd] md:px-10 py-10 justify-center'>
                <Slider {...settings} className='px-10'>
                    {
                      videos.map((vid)=>(
                        // console.log(vid)
                        <Thumbnail img={vid.thumbnail_path} key = {vid._id} id = {vid._id}/>
                      ))  
                    }
                </Slider>
            </div>
        </div>
      )
    }