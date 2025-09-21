import React from 'react'
import ContestCard from '../ContestCard'


function Contests() {
  return (
    <div>

      <div className='text-center mt-38 text-2xl font-bold'>Contest</div>
          
          <div className='flex gap-2 items-center justify-center mt-20'>
          <ContestCard/>
          <ContestCard/>
          </div>
      <div>

      </div>
    </div>
  )
}

export default Contests