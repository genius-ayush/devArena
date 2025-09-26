'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Spinner } from '../ui/shadcn-io/spinner';

interface contestPageSchema {
    id : string ; 
}

interface contestSchema{
  id : string ; 
  name : string ;
  description : string ; 
  questionCount : number ; 
  totalMarks : number ; 
  endTime : string ; 
  startTime : string ; 
  createdAt : string ; 
  updatedAt : string ; 
  setterId : string ;  
}

interface questionSchema{
  id: string ; 
  problemStatement : string ; 
  checkParameter : string ; 
  marks : number ; 
  questionOrder : number ; 
  contestId : string ; 
}

interface responseSchema{
    contest : contestSchema ; 
    questions : questionSchema[] ;
}



function ContestPage({id}:contestPageSchema) {

    const token = localStorage.getItem('token') ; 
    const [contest , setContest] = useState<responseSchema>() ; 
    const [loading , setLoading] = useState(false) ; 
    const [error , setError] = useState<any>() ; 

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

    useEffect(()=>{
        const fetchData = async()=>{
        setLoading(true) ; 

          try{
            const getContest = await axios.get(`http://localhost:5000/contest/${id}` , {headers : {Authorization : `bearer ${token}` }})
            setContest(getContest.data) ;
            console.log(getContest.data) ;
          }catch(error){
            console.error(error) ; 
            setError("Error fetching contest info") ; 
          }
          console.log("tital marks"  , contest?.contest.totalMarks) ; 
          setLoading(false) ; 
        }


        fetchData() ; 
    } , [])


    if(loading){
      return (
        <Spinner/>
      )
    }

    if(error){
      return(
        <div className='text-red-500'>{error}</div>
      )
    }
  return (
    <div>
      <div className='text-center font-bold text-2xl'>{contest?.contest.name}</div>
      <div className='mt-5'>{contest?.contest.description}</div>
      <div className='flex justify-between'>
      <div>Starts At : {formatted(contest?.contest.startTime.toString()!)}</div>
      <div>total marks : {contest?.contest.totalMarks}</div>
      </div>
      <div className='w-[1000px] mt-10'>

        <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >

        {
          contest?.questions.map((question)=>(
            <AccordionItem value="item-1" key={question.id}>
            <AccordionTrigger>{question.problemStatement}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                {question.checkParameter}
              </p>
              
            </AccordionContent>
          </AccordionItem>
          ))
        }
        
      </Accordion>
      </div>

    </div>
  )
}

export default ContestPage