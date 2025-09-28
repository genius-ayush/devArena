'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ContestCard from '../ContestCard';
import Contest from '@/app/setterDashboard/contests/page';
import { Spinner } from '../ui/shadcn-io/spinner';

interface contestsProps{
    id : string ;
    name : string ; 
    description : string ; 
    startTime : string ; 
    endTime : string ; 
}

function ParticipantContestPage() {

    const [error , setError] = useState<any>(""); 
    const [contests , setContests] = useState<contestsProps[]>([]) ; 
    const [loading , setLoading] = useState(false) ; 

  useEffect(()=>{

    const fetchData = async()=>{
        setLoading(true) ; 
        const token = localStorage.getItem("token") ; 
        console.log(token) ; 
        try{
            console.log("reached insied try block") ; 
            const response = await axios.get("http://localhost:5000/contest/allContest" , {headers : {Authorization : `bearer ${token}`}})
            setContests(response.data) ; 
        }catch(error){
            console.error(error) ; 
            setError("error fetching contests") ; 
        }

        setLoading(false) ; 
    }

    fetchData() ; 
  } , [])

  if(loading){
    return(
        <Spinner/>
    )
  }
  return (
    <div>
        <div className='text-2xl font-bold text-center'>Contests</div>
        <div className='grid grid-cols-3 gap-3  mt-20 justify-center'>
            {contests.map((contest)=>(
                <ContestCard key={contest.id} name={contest.name} desc={contest.description} startTime={contest.startTime} endTime={contest.endTime} button='Participate' id={contest.id}/>
            ))}
        </div>
    </div>
  )
}

export default ParticipantContestPage