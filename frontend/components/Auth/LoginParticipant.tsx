'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { z } from 'zod';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const sendEmailSchema = z.email();


const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})



function LoginParticipant() {
  const [mail, setMail] = useState<string | null>("ayushsanjayrawal@gmail.com");
  const [error, setError] = useState<any>();
  const [send, setSend] = useState(true);
  const isDisabled = !mail
  const [token , setToken] = useState<string | null>(localStorage.getItem("token")) ; 
  const router = useRouter() ; 

  type sendEmailType = z.infer<typeof sendEmailSchema>;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  const handleOtp = async () => {

    if (mail == null) {
      return;
    }
    const email: sendEmailType = mail;

    try {

      const response = await axios.post("http://localhost:5000/auth/send_otp", {
        email
      })

      if (response.status == 200) {
        setSend(true);
      }
    } catch (error) {
      console.error("err", error);
      setError("Error getting otp");
    }

  }

  const onSubmit =  async (data: z.infer<typeof FormSchema>)=> {
    
   
    
   const response = await axios.post("http://localhost:5000/auth/signin_participant" , {email : mail , otp : data.pin}) ; 

   localStorage.setItem("token" , response.data) ;
   setToken(response.data) ; 
   
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  if(token){
    router.push('/participantDashboard')
  }

  if (send) {
    return (

      <div className='flex justify-center items-center h-screen w-3/4 mx-auto'>

        <div className='w-2/5 p-5 rounded-xl shadow border flex justify-center'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-center items-center h-screen  w-3/4 mx-auto">
      <div className="w-2/5 p-5 rounded-xl shadow border">
        <div className="font-bold text-2xl mb-3 text-center">Welcome to DevArena</div>
        <div className=' mx-auto'>
          <Input type="email" placeholder="Enter your email address" className="mb-2" required onChange={(e) => setMail(e.target.value)} />
          <div className='flex justify-center'>
            <Button className="mt-4 " onClick={handleOtp} disabled={isDisabled}>Send Verification Code</Button>
          </div>
          <p>{error}</p>

        </div>
      </div>
    </div>
  )
}

export default LoginParticipant