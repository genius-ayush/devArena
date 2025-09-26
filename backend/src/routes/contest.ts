import { Router } from "express";
import { participantMiddleware, setterMiddleware } from "../middlewres";
import { PrismaClient } from "../../generated/prisma";
import { ContestSchema, QuestionSchema, UpdateContestSchema } from "../types";

const prismaClient = new PrismaClient() ;

const router = Router() ; 

//create context
router.post('/' , setterMiddleware ,  async(req , res)=>{

    console.log(req.body) ; 
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

//getcontest of setters 
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

router.get('/participant' , participantMiddleware , async(req ,res)=>{

    const participantId = req.headers['userId'] ; 

    if(typeof(participantId) != 'string'){
        return res.status(500).send("invalid partipant id") ;
    }

    try{
        const contests = await prismaClient.contest.findMany() ; 
        res.status(200).json(contests) ; 
    }catch(error){
        return res.status(500).json(error) ; 
        
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
        const contest = await prismaClient.contest.findUnique({ where: {
            setterId , id : contestId
        }})

        const questions = await prismaClient.question.findMany({where : {
            contestId
        }})

        res.status(200).json({contest , questions}) ; 
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


router.post('/:contestId/join' , participantMiddleware , async(req , res)=>{

    const participantId = req.headers['userId'] ; 
    const contestId = req.params.contestId ;


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

        res.status(200).json(participation) ; 
    }catch(error){
        console.error(error) ; 
        res.status(500).json({
            message: "error joining the contest"  
        })
    }
})

router.patch('/contest/:contestId/start' , participantMiddleware , async(req , res)=>{
    
    const participantId = req.headers['userId'] ; 
    const contestId = req.params.contestId ; 

    if(typeof(participantId) != 'string'){
        return  res.status(500).json('invalid participationid type') ;
    }

    const participantion = await prismaClient.contestParticipation.update({
        where: {
            participantId_contestId: {
              participantId,
              contestId,
            },
          } , 

         data:{
            startedAt : Date.now().toString() , 
            status :'IN_PROGRESS' 

         }

    })

    res.status(200).json(participantion) ; 
})

router.post('/contest/:contestId/:questionId/submit' , participantMiddleware , async(req , res)=>{

    const participantId = req.headers['userId'] ; 
    const {contestId , questionId} = req.params ; 
    const answer = req.body ; 
    
    if(typeof(participantId) != 'string'){
        return res.status(500).send("invalid participationid") ; 
    }

    const participation = await prismaClient.contestParticipation.findUnique({
        where:{
            id : participantId
        }
    })

    if(!participation){
        return res.status(400).json({error:'not registered'})
    }

    const question  = await prismaClient.question.findUnique({
        where:{
            id : questionId
        }
    })

    if(!question){
        return res.status(404).json('cannot get any questions') ; 
    }

    const isCorrect = question.checkParameter.trim() === answer.trim();


    const submission = await prismaClient.submission.create({
        data:{
            participantId , 
            contestId , 
            questionId , 
            contestParticipationId : participantId , 
            answer , 
            score : isCorrect ? question.marks : 0 , 
            isCorrect ,
        }
    })

    await prismaClient.contestParticipation.update({
        where :{id :participantId} , 
        data:{
            totalScore : {increment:submission.score}
        }
    })


    
})

export default router ; 