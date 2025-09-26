'use client'
import ContestPage from '@/components/Dashboard/ContestPage';
import { useParams } from 'next/navigation'
import React from 'react'

function Contest() {
    const params = useParams<{id:string}>() ; 
  return (
    <ContestPage id={params.id}/>
  )
}

export default Contest