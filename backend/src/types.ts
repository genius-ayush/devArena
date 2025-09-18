import {email, z} from 'zod' ; 

export const CreateUser = z.object({
    email : z.email() , 
})

export const Signin = z.object({
    email:z.email() , 
    otp : z.string().or(z.number().int()) , 
})


export const QuestionSchema = z.object({
    
    problemStatement : z.string() ,     
    checkParameter : z.string() ,
    marks : z.number() ,
    questionOrder : z.number() , 

})

export const ContestSchema = z.object({
    name : z.string() , 
    description : z.string() , 
    questionCount : z.number() ,
    totalMarks : z.number() , 
    startTime : z.string() ,
    endTime : z.string() , 
    questions : z.array(QuestionSchema) , 
})


export const UpdateQuestionSchema = z.object({
    
    problemStatement : z.string().optional() ,     
    checkParameter : z.string().optional() ,
    marks : z.number().optional() ,
    questionOrder : z.number().optional() , 

})

export const UpdateContestSchema = z.object({
    name : z.string().optional() , 
    description : z.string().optional() , 
    questionCount : z.number().optional() ,
    totalMarks : z.number().optional() , 
    startTime : z.string().optional() ,
    endTime : z.string().optional() , 
    questions : z.array(QuestionSchema).optional() , 
})

