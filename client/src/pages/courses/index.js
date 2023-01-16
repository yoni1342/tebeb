import React, {useState, useEffect} from 'react'
import Subject from '../../components/Playlists'
import Footer from '../../components/Footer/Footer'
import {axios} from '../../axios'
import  Navbar from '../../components/Navbar/Navbar';

const ISSERVER = typeof window === "undefined";


function courses() {
  const [data, setData] = useState([])

  useEffect(()=>{
    if(!ISSERVER){
      const user  = localStorage.getItem("user")
      
      if (!user){
        window.location.replace('/signin')
      }
      const grade = JSON.parse(user).grade
      const token = JSON.parse(user).token
      if(!token){
				window.location.replace('/signin')
      }


      const headers = {
        'Content-Type': 'application/json',
        'access_token': token
      }
      axios.get('/playlist',{
        headers: headers,
      }).then((res)=>{
        const data = res?.data?.result?.playlist
        setData(data)
      }).catch((err)=>
      console.log(err))
    }
  },[])

  return (
    <div className=" ">
    <Navbar />
    <main className="px-8 min-h-screen">
      <h2 className="text-tibebOrange text-2xl my-6 font-Outfit">Subjects</h2>
      <section className="flex flex-col justify-center space-y-10 py-10">
        {  
          data.map((playlist)=>(
            <Subject id={playlist._id} name={playlist.name} key={playlist._id} image = {playlist.thumbnail_path} desc={playlist.desc} date={playlist.updatedAt}/>
          ))
        }
      </section>
    </main>
    <Footer />
    </div>
  )
}

export default courses
