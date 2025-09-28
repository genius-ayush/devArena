import { Router } from "express";
import { participantMiddleware } from "../middlewres";
import { PrismaClient } from "../../generated/prisma";
import { ja } from "zod/v4/locales";
const router = Router() ; 
const prismaClient = new PrismaClient() ; 

router.get("/contest/:id" ,participantMiddleware ,  async(req , res)=>{
    
    const participantId = req.headers["userId"] ; 

    if(typeof(participantId) != 'string'){
        return res.status(400).send("Unauthorized") ;
    }
    const contestId = req.params.id ; 
    try{
        const contest = await prismaClient.contest.findFirst() ; 
        // const questionStatement = await prismaClient.question.findMany({where:{contestId}, select:{problemStatement:true , marks:true}})
        return res.status(200).send({contest}) ; 
    }catch(error){
        console.error(error) ; 
        return res.status(400).send("unable to fetch data") ; 
    }
})

router.post('/:contestId/join' , participantMiddleware , async(req , res)=>{

    const participantId = req.headers['userId'] ; 
    const contestId = req.params.contestId ;
    console.log("contestId" , contestId) ; 

    if(typeof(participantId) != 'string'){
        return res.status(500).send("invalid partipant id") ;
    }


    if(!contestId){
        return res.status(500).json('no contestId found') ; 
    }

    try{

        const participation = await prismaClient.contestParticipation.upsert({
            where: {
                participantId_contestId: {
                  participantId,
                  contestId,
                },
              },
        
            update : {} , 
            create:{
                participantId , contestId , status: 'REGISTERED'
            }
        })
        const contest = await prismaClient.contest.findFirst({where:{id : contestId} , select:{name : true}}) ; 
        const questions = await prismaClient.question.findMany({where:{contestId} , select:{problemStatement:true , marks:true}} ) ; 

        res.status(200).json({participation , questions , contest}) ; 
    }catch(error){
        console.error(error) ; 
        res.status(500).json({
            message: "error joining the contest"  
        })
    }
})

export default router ; 