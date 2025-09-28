'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from '../ui/shadcn-io/spinner';
import { useParams } from 'next/navigation';
import { Button } from '../ui/button';

interface participationProps{
    id : string ; 
    participationId : string ; 
    contestId : string ; 
    joinedAt : string ; 
    startedAt : string ; 
    finishedAt : string ; 
    totalScore : number ; 
    status : string ; 
}

interface questionProps{
    problemStatement : string ; 
    marks : number ; 
}

interface contestProps{
    name : string ; 
}

interface responseProps{
    participation : participationProps ; 
    questions : questionProps[] ; 
    contest : contestProps ; 
}

function StartContestPage() {

    const [error , setError] = useState<string>("") ; 
    const [loading , setLoading] = useState(false) ; 
    const [details , setDetails] = useState<responseProps>() ; 
    const params = useParams()
    useEffect(()=>{

        const fetchData = async()=>{
            const token = localStorage.getItem('token') ; 
            try{
                setLoading(true) ; 
                const contestId = params.id ; 
                console.log(contestId) ; 
                console.log(token) ; 
                const response = await axios.post(`http://localhost:5000/participant/${contestId}/join` ,{} ,  {headers : {Authorization : `bearer ${token}`}}) ; 
                console.log(response) ; 
                setDetails(response.data)

            }catch(err){
                setError("error fetching contest details"); 
                console.error(err , error)
            }
            
            setLoading(false) ; 
        }
        fetchData() ; 
    } , [])

    if(loading){
        return <Spinner/>
    }

    if(error){
        return <div>{error}</div>
    }
  return (
    <div>
        <div className='font-bold text-2xl text-center'>{details?.contest.name}</div>
        <div className='mt-10'>
            {
                details?.questions.map((question)=>(
                    <div className='border shadow px-3 py-1 mb-2 rounded flex  items-center gap-3 w-[1000px] justify-between'>
                        <div>{question.problemStatement}</div> <div className='flex gap-2'><div className='border px-4 py-2 rounded shadow'>{question.marks} marks</div> <Button>Submit Response</Button></div></div>
                ))
            }
        </div>
    </div>
  )
}

export default StartContestPage