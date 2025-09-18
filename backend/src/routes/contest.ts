import { Router } from "express";
import { setterMiddleware } from "../middlewres";
import { PrismaClient } from "../../generated/prisma";
import { ContestSchema, QuestionSchema, UpdateContestSchema } from "../types";

const prismaClient = new PrismaClient() ;

const router = Router() ; 

//create context
router.post('/' , setterMiddleware ,  async(req , res)=>{

    
    const setterId  = req.headers["userId"]! ; 
    if(typeof(setterId) != 'string'){
        res.send(500).send("invalid setterId") ; 
        return ; 
    }
    const {success , data} = ContestSchema.safeParse(req.body);

    if(!success){
        res.status(411).send("Invalid input" )

        return ; 
    }

    try{
        let response = await prismaClient.contest.create({
            data :{
                setterId : setterId , 
                name : data.name , 
                description : data.description , 
                questionCount : data.questionCount ,  
                totalMarks : data.totalMarks , 
                startTime : data.startTime , 
                endTime : data.endTime , 
                questions: {
                    create: data.questions.map((q) => ({
                      problemStatement: q.problemStatement,
                      checkParameter: q.checkParameter,
                      marks: q.marks,
                      questionOrder: q.questionOrder,  
                    })),
                  },
            }
        })

        res.status(200).send({message : "contest created successfully" ,  response});
    }catch(error){
        console.error(error) ; 
        res.status(500).json("failed to create contest")
    }
})

//getcontest
router.get('/' ,setterMiddleware , async(req , res)=>{
  const setterId = req.headers["userId"] ; 

  if(typeof(setterId) != 'string'){
    res.send(500).send('invalid setterId') ; 
    return ; 
  }

  try{

      const response = await prismaClient.contest.findMany({where : {setterId}}) ; 
      res.status(200).send(response) ; 
  }catch(error){
    res.status(500).json("failed to get contests") ;
  }



})


//getContest by id 
router.get('/:id' ,setterMiddleware , async(req , res)=>{

    const setterId = req.headers['userId'] ; 
    console.log(setterId) ; 
    const contestId = req.params.id ; 

    if(typeof(setterId) != 'string'){
        res.send(500).send('invalid setterId') ; 
        return; 
    }

    try{
        const response = await prismaClient.contest.findUnique({ where: {
            setterId , id : contestId
        }})

        res.status(200).json(response) ; 
    }catch(error){
        res.status(500).json('failed to get the contest') ; 
    }
})


// update contestby id 
// router.patch('/contest/:id', setterMiddleware , async(req , res)=>{
//     const setterId = req.headers['userId'] ;
//     const contestId = req.params.id ; 

//     if(typeof(setterId) != 'string'){
//         res.status(500).send('invalid setterId') ; 
//         return; 
//     }

//     const {success , data} = UpdateContestSchema.safeParse(req.body) ; 

//     if(!success){
//         return res.status(500).json('invalid types') ; 
//     }

//     try{

//         const contest = await prismaClient.contest.findUnique({where:{setterId , id:contestId}})

//         if(!contest){
//             res.status(403).send("not authorized to update this contest")
//         }

//         const updatedContest = await prismaClient.contest.update({ where:{
//              id:contestId } , data 
//         })

//         return res.status(200).json('contest updated successfully') ;
//     }catch(error){
//         res.status(500).json(error) ; 
//         return ; 
//     }
// })

export default router ; 