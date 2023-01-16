import React, { useEffect, useState } from 'react'
import {axios} from '../../axios'
import Question from './Question'
import { useSelector, useDispatch } from 'react-redux'
import CorrectQuestion from './CorrectQuestion';
import WrongQuestion from './WrongQuestion';


const ISSERVER = typeof window === "undefined";


function Questions({type, id}) {
    const [correction, setCorrection] = useState({})
    const [submited, setSubmited] = useState(false)
    const questionState = useSelector((state) => state)
    const ans = {}
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
          axios.get( `/question/video/${id}`,{
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
    data.map((qt)=>{
      ans[qt._id] = qt.answer
    })
    
    const checkans = ()=>{
      setSubmited(true)
      const key1 = Object.keys(questionState)
      console.log(key1)

      for(let key of key1){
        if(questionState[key]==ans[key]){
          console.log("correct")
          setCorrection(correction=>({
            ...correction,
            [key]: "correct"
          }))
        }
        else if(questionState[key]!=ans[key] && key!=="_persist"){
          console.log("not correct")
          setCorrection(correction=>({
            ...correction,
            [key]: "incorrect"
          }))
        }
      }
    }
    console.log(correction)
    return (
    <div className='min-h-screen pt-10 px-3 mx-3'>
        <h2 className='text-4xl text-primary-500 pb-3'>Question</h2>
        {
          submited?(
            <div>
                {
                  data.map((question, index)=>{
                    if (correction[question._id] == 'correct'){
                      // console.log(cor[question._id])
                      return <CorrectQuestion key={question._id} id={question._id} index={index} question={question.question} options={question.options}/>
                    }
                    else{
                      return <WrongQuestion key={question._id} id={question._id} index={index} question={question.question} options={question.options}/>
                    }
                  })
                }
            </div>
          ):(
            <div>
          <div>
            {
              data.map((question, index)=>(
                <Question key={question._id} id={question._id} index={index} question={question.question} options={question.options} />
              ))
            }
          </div>
          <div className='bg-primary-500 w-32 text-center text-white px-3 py-2 rounded-2xl text-lg cursor-pointer hover:bg-primary-400 hover:shadow-md active:scale-95 transition-transform duration-150 ease-in-out uppercase mt-4' onClick={()=>checkans()}>
            Submit
          </div>
        </div>
          )
        }
        
        

    </div>
  )
}

export default Questions