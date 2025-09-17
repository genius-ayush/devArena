import { Request, Response, Router } from 'express';
import { TOTP } from "totp-generator"
import { CreateUser, Signin } from '../types';
import * as base32 from 'hi-base32';
import { sendEmail } from '../utils/email';
import jwt from 'jsonwebtoken' ; 
import { PrismaClient } from '../../generated/prisma';
import { participantMiddleware, setterMiddleware } from '../middlewres';

const router = Router();

const otpCache = new Map<string , string>() ; 
const prismaClient = new PrismaClient() ; 

router.post('/send_otp', async (req: Request, res: Response) => {

    try {

        const { success, data } = CreateUser.safeParse(req.body);

        if (!success) {
            res.status(411).json('invalid input');
            return;
        }

        const { otp, expires } = await TOTP.generate(base32.encode(data.email + process.env.JWT_SECRET!))

        sendEmail(data.email , otp) ; 
        otpCache.set(data.email , otp) ;  
        
        res.send({ otp, expires });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "internal server error",
        })
    }


})


router.post('/signin_setter' , async(req , res)=>{

    const{success , data} = Signin.safeParse(req.body) ; 

    if(!success){
        res.status(411).json('invalid input') ; 
        return ; 
    }

    if(otpCache.has(data.email)){
        if(otpCache.get(data.email) == data.otp){

            const setter = await prismaClient.setter.findUnique({

                where:{

                    email : data.email , 
                }
            })

            if(setter){
                const token = jwt.sign({userId : setter.id} , process.env.JWT_SECRET!) ; 
                return res.status(200).json(token) ; 

            }else{
                const newSetter= await prismaClient.setter.create({
                    data:{
                        email : data.email
                    }
                })

                const token = jwt.sign({userId : newSetter.id} , process.env.JWT_SECRET!)

                return res.status(200).json(
                    token
                )
            }
            
        }else{
            res.status(411).json('invlid input') ; 
        }
    }else{
        res.status(411).json('invalid input') ;
        return ;  
    }

    
})  


router.post('/signin_participant' , async(req , res)=>{

    const{success , data} = Signin.safeParse(req.body) ; 

    if(!success){
        res.status(411).json('invalid input') ; 
        return ; 
    }

    if(otpCache.has(data.email)){
        if(otpCache.get(data.email) == data.otp){

            const participant = await prismaClient.participant.findUnique({

                where:{

                    email : data.email , 
                }
            })

            if(participant){
                const token = jwt.sign({userId : participant.id} , process.env.JWT_SECRET!) ; 
                return res.status(200).json(token) ; 

            }else{
                const participant= await prismaClient.participant.create({
                    data:{
                        email : data.email
                    }
                })

                const token = jwt.sign({userId : participant.id} , process.env.JWT_SECRET!)

                return res.status(200).json(
                    token
                )
            }
            
        }else{
            res.status(411).json('invlid input') ; 
        }
    }else{
        res.status(411).json('invalid input') ;
        return ;  
    }

    
}) 

router.get('/setterMe' , setterMiddleware ,   async(req, res) => {

    const setterId = req.headers["userId"] ;
    if (typeof setterId !== "string") {
        return res.status(400).json({ message: "Invalid setter Id" })
    } 


    try{
        const setter = await prismaClient.setter.findUnique({
            where : {
                id : setterId
            }
        })

        if(setter){
            return res.status(200).json({
                setter
            })
        }else{
            return res.status(403).json({
                message: 'no seter found'
            })
        }
    }catch(error){
        res.status(403).json(error) ; 
    }
    
})

router.get('/participantMe' , participantMiddleware , async(req , res)=>{

    const participantId = req.headers["userId"] ; 
    if (typeof participantId !== "string") {
        return res.status(400).json({ message: "Invalid participant Id" })
    } 

    try{
        const participant = await prismaClient.participant.findUnique({where:{
            id : participantId
        }})

        return res.status(200).json({participant})
    }catch(error){
        return res.status(403).json({
            message:"invalid setterId"
        })
    }
} )

export default router; 