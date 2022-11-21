import Chapter from '../../components/Chapter'
import { useRouter } from 'next/router'
import axios from 'axios';
import { useState ,useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
const ISSERVER = typeof window === "undefined";


function subject() {
	const [data, setData] = useState()
	const [isLoading, setLoading] = useState(false)
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
				axios.get(`http://localhost:9000/api/playlist/${query.id}/`,{
				  headers: headers
				}).then((res)=>{
				  const data = res?.data?.result?.playlist
				  setData(data)
				}).catch((err)=>
				console.log(err))
			}
		}
	},[query])
	return (
		<div className=" min-h-screen">
			<Navbar />
            <main className=''>
                
				{
					data?.chapters?.map((chapter)=>(
						// console.log(chapter.videos)
						<Chapter number={chapter.number} title = {chapter.title} key={chapter._id} videos={chapter.videos}/>
					))
				}
            </main>
		</div>
	);
}

export default subject;


