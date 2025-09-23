import React from 'react'
import ContestCard from '../ContestCard'
import { Button } from '../ui/button'

const contests = [ 
  
  {
  name : "Algorithm 101" ,
  desc : "This is a algorithimc contest where you have to solve algorithmic questions" , 
  startTime : "8:30 pm" , 
  endTime : "9:30 pm " , 
  button : 'Edit' , 
} , 


{
  name : "Dev 101" ,
  desc : "This is a dev contest where you have to solve coding questions" , 
  startTime : "8:30 pm" , 
  endtime : "9:30 pm " , 
  button : 'Edit', 

} , 

{
  name : "Algorithm 101" ,
  desc : "This is a algorithimc contest where you have to solve algorithmic questions" , 
  startTime : "8:30 pm" , 
  endtime : "9:30 pm " , 
  button : 'Edit',
}

]

function ContestPage() {
  return (
    <div className='' >
      <div className='flex justify-between'>
      <div className='text-2xl font-bold mb-10'>Contests</div>
      <Button>Create Contest</Button>
      </div>
      <div className='flex flex-wrap gap-3'>
        {contests.map((contest)=>(
          <ContestCard name={contest.name} desc={contest.desc} startTime={contest.startTime} button={contest.button}/>
        ))}
      </div>
    </div>
  )
}

export default ContestPage  