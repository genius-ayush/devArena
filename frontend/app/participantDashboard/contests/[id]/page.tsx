'use client'
import ContestParticipantPage from '@/components/Dashboard/contestParticipantPage';
import { useParams } from 'next/navigation'
import React from 'react'

function Contest() {
    const params = useParams<{id:string}>(); 
  return (
    <div>
        <ContestParticipantPage id={params.id}/>
    </div>
  )
}

export default Contest