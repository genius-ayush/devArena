import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from '../ui/shadcn-io/spinner';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface contestParams{
    id : string  ; 
}

interface contestSchema{
    id : string ;
    name : string ; 
    description : string ; 
    questionCount : number ;
    totalMarks : number ; 
    startTime : string ; 
    endTime : string ; 
    setterId : string ; 
}

// interface questionStatementSchema{
//     problemStatement : string ; 
//     marks : number ; 
// }


interface responseSchema {
    contest : contestSchema ; 
    // questionStatement : questionStatementSchema[] ; 
}

const formatted = (input : string)=>{
    return new Date(input).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  } 


function ContestParticipantPage({id} : contestParams) {

    const [error , setError] = useState<string>("") ; 
    const [contest , setContest] = useState<responseSchema>() ; 
    const [loading , setLoading] = useState(false) ; 
    const router = useRouter() ; 

    useEffect(()=>{
        const token = localStorage.getItem('token') ; 
        
        const fetchData = async()=>{
            setLoading(true) ; 
            try{

                  
                const response = await axios.get(`http://localhost:5000/participant/contest/${id}` , {headers : {Authorization : `bearer ${token}`}}) ; 
                console.log(response.data) ; 
                setContest(response.data) ; 
            }catch(error){
                console.error(error) ; 
                setError("error fetching data") ; 
            }
            setLoading(false) ; 
        }

        fetchData() ; 
    } , [])

    if(error){
        return(
            <div>{error}</div>
        )
    }

    if(loading){
        return(
            <Spinner/>
        )
    }
  return (
    <div className='w-[1000px]'>
        <div className='text-3xl font-bold text-center'>{contest?.contest.name}</div>
        <div className='flex justify-between mt-10 font-light'>
        <div className='text-left '>Start Time : {formatted(contest?.contest.startTime!)}</div>
        <div className='text-right '>End Time :  {formatted(contest?.contest.endTime!)}</div>
        </div>
        <div className='mt-8 text-center'>{contest?.contest.description}</div>
        <div>Total questions : {contest?.contest.questionCount}</div>
        

        <div className='flex justify-center mt-10'>
        <Button onClick={()=>router.push(`/participantDashboard/contests/${id}/startContest`)}>Start Contest</Button>
        </div>
        {/* <div>
            {contest?.questionStatement.map((question)=>(
                <div className=' mt-10  shadow border  px-4 py-4 rounded-xl flex justify-between'>
                    <div className='font-bold'>{question.problemStatement}</div>
                    <div className='border px-2 py-2 rounded bg-secondary'>{question.marks} marks</div>
                    </div>
            ))}
        </div> */}
    </div>
  )
}

export default ContestParticipantPage