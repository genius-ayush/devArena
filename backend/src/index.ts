import express from 'express' ; 
import dotenv from 'dotenv' ; 

import cors from 'cors' ; 
const app = express() ;
const port = 5000 ; 

app.use(cors()) ; 
app.use(express.json()) ;
dotenv.config() ; 
import authRoutes from './routes/auth' ; 
import contestRoutes from './routes/contest' ; 
import participatonRoutes from './routes/participate' ; 
import resultRoutes from './routes/result'  ; 
import participantsRoutes from './routes/participant' ; 

app.get('/' , (req , res)=>{
    res.send('hello world') ; 
})

app.use('/auth' , authRoutes) ; 
app.use('/contest' , contestRoutes) ; 
app.use('/participaton' , participatonRoutes) ; 
app.use('/result' , resultRoutes) ;
app.use('/participant' , participantsRoutes) ;  


app.listen(port , ()=>{
    console.log(`Application running at ${port}`) ;
})