import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Question from './Question'

const ISSERVER = typeof window === "undefined";


function Questions({type, id}) {
    console.log(id)
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

        if(type =='video'){
          axios.get( `http://localhost:9000/api/question/video/${id}`,{
            headers
          }).then((res)=>{
            const data = res?.data?.result.questions
            setData(data)
            // console.log(data)
          }).catch((err)=>{
            console.log(err)
          })
        }

    }},[type,id])

    return (
    <div className='min-h-screen pt-10 px-3 mx-3'>
        <h2 className='text-4xl text-primary-500 pb-3'>Question</h2>
        {
          data.map((question, index)=>(
            <Question index={index} question={question.question} options={question.options} />
          ))
        }
    </div>
  )
}

export default Questions