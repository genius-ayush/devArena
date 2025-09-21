import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

function ContestCard() {
  return (
    <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Algorithm 101</CardTitle>
    </CardHeader>
    <CardContent>
      Time: 20 Sept 2025
    </CardContent>
    <CardFooter className="flex-col gap-2">
      <Button type="submit" className="w-full">
        Participate
      </Button>
     
    </CardFooter>
  </Card>
  )
}

export default ContestCard