import React, { useEffect } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'



interface contestProps {
  name : string ; 
  desc : string ; 
  startTime ?: string ; 
  endTime ?: string  ; 
  button : string ; 
}



function ContestCard(contest : contestProps) {

  useEffect(()=>{
    
  } , [])

  return (
    <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle>{contest.name}</CardTitle>
    </CardHeader>

    <CardContent>
      {contest.desc}
    </CardContent>
    <CardContent>
      Starts on : {contest.startTime}
    </CardContent>
    <CardFooter className="flex-col gap-2">
      <Button type="submit" className="w-full">
        {contest.button}
      </Button>
     
    </CardFooter>
  </Card>
  )
}

export default ContestCard