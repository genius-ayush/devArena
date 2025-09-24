'use client'
import React, { useEffect, useState } from 'react'
import ContestCard from '../ContestCard'
import { Button } from '../ui/button'
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface contestProps{

  id: string ; 
  name : string ; 
  description : string ;
  startTime : string ; 
  endTime : string , 

}

// const contests = [ 
  
//   {
//   name : "Algorithm 101" ,
//   desc : "This is a algorithimc contest where you have to solve algorithmic questions" , 
//   startTime : "8:30 pm" , 
//   endTime : "9:30 pm " , 
//   button : 'Edit' , 
// } , 


// {
//   name : "Dev 101" ,
//   desc : "This is a dev contest where you have to solve coding questions" , 
//   startTime : "8:30 pm" , 
//   endtime : "9:30 pm " , 
//   button : 'Edit', 

// } , 

// {
//   name : "Algorithm 101" ,
//   desc : "This is a algorithimc contest where you have to solve algorithmic questions" , 
//   startTime : "8:30 pm" , 
//   endtime : "9:30 pm " , 
//   button : 'Edit',
// }

// ]

function ContestPage() {

  const [error , setError] = useState("") ; 
  const [contests , setContests] = useState<contestProps[]>([]) ; 
  const router = useRouter() ;
  
  
  const formatted= (input : string)=>{
    return new Date(input).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  } 

  useEffect(()=>{
    const fetchData = async()=>{
    const token = localStorage.getItem("token") ; 
    console.log(token) ; 

    if(!token){
      router.push("http://localhost:3000/auth/loginSetter")
    }
      try{
        const response = await axios.get('http://localhost:5000/contest' ,{
          headers: {
            Authorization: `Bearer ${token}`,
          },

        })

        console.log(response.data) ; 
        setContests(response.data) ; 
      }catch(error){
        console.error("err" , error);
        setError("error fetching Contests") ;  

      }
    }

    fetchData() ; 
  } , [])


  return (
    <div className='' >
      <div className='flex justify-between'>
      
      <div className='text-2xl font-bold mb-10' >Contests</div>
      <Button onClick={()=>router.push('/setterDashboard/createContest')}>Create Contest</Button>
      </div>
      <div className='flex flex-wrap gap-3'>
        {contests.map((contest)=>(
          <ContestCard key={contest.id} name={contest.name} desc={contest.description} startTime={formatted(contest.startTime)} button="Edit"/>
        ))}
      </div>
    </div>
  )
}

export default ContestPage  