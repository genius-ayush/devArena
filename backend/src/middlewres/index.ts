import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken' ; 

export const setterMiddleware = (req : Request , res : Response , next : NextFunction)=>{


    const authtoken = req.headers.authorization?.split(" ")[1] ; 
    if(!authtoken){
        res.send(403).send({
            message: "Invalid auth token" , 
            success : false 
        })

        return ;
    }


    try{
        
        jwt.verify(authtoken , "S3CRET" , (err , payload)=>{
        
            if(err){
               return  res.status(403) ; 

            }

            if(!payload){
        
                res.status(403) ; 
                return; 
            }

            if(typeof(payload) == 'string'){
    
                res.status(403); 
                return ;
            }
        
            req.headers['userId'] = payload.userId ; 
            next() ; 
        })
    }catch(error){
        res.status(403).send({
            message:"Invalid auth token" , 
            success : false
        })
    }

}

export const participantMiddleware = (req : Request , res : Response , next :NextFunction)=>{
    console.log("reached here") ; 
    const authtoken = req.headers.authorization?.split(" ")[1] ; 
    console.log(authtoken) ; 
    console.log(req.headers.authorization) ; 
    if(!authtoken){
        res.status(403).send({
            message: "token now found" , 
            success: false
        })

        return ; 
    }


    try{

        console.log(process.env.JWT_SECRET_PARTICIPANT) ; 
        jwt.verify(authtoken , process.env.JWT_SECRET_PARTICIPANT! , (error , payload)=>{

            if(error){
                res.status(403) ; 
                return ; 
            }

            if(!payload){
                res.status(403) ;
                return ;  
            }

            if(typeof(payload) == 'string'){
                res.status(403) ; 
                return ; 
            }

            req.headers['userId'] = payload.userId ; 
            next() ; 
        })

    }catch(e){
        console.error(e) ; 
        res.status(403).send({
            message: "Invalid tokne" , 
            success: false ,
        })
    }
}