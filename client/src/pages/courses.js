import React, {useState, useEffect} from 'react'
import Subject from '../components/Playlists'
import Footer from '../components/Footer'
import axios from 'axios'

const ISSERVER = typeof window === "undefined";


function courses() {
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
      axios.get('http://localhost:9000/api/playlist',{
        headers: headers
      }).then((res)=>{
        const data = res?.data?.result?.playlist
        setData(data)
      }).catch((err)=>
      console.log(err))
    }
  },[])
  console.log(data)

  return (
    <div className=" bg-gradient-to-t from-[#fbfbf2] to-[#fbfbf2] ">
        <div className="flex items-center p-3 w-52 md:w-48 ">
				  <img src="./logo.svg" />
		    </div>
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


















// <Subject color="tibebPink" name = "MATHEMATICS" image="icons/math.png" />
//         <Subject color="tibebYellow" name = "PHYSICS" image="icons/physics.png" />
//         <Subject color="tibebBlue" name = "CHEMISTRY" image="icons/chemo.png" />
//         <Subject color="tibebGreen" name = "BIOLOGY" image="icons/bio.png" />
//         <Subject color="tibebLightGreen" name = "SOCIAL STUDIES" image="icons/social.png" />
//         <Subject color="tibebPurple" name = "EXAM" image="icons/Group.png" />