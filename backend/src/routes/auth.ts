import{Request, Response, Router} from 'express' ; 

const router = Router() ; 

router.post('/signin' , (req:Request , res : Response)=>{
    
    res.send('signin route') ; 
})

router.get('/me' , (req , res)=>{
    
})

export default router ; 