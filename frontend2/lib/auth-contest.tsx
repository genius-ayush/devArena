'use client'

import { createContext, useState } from "react"

interface User{
    id : string ; 
    email : string ; 
    name : string ; 
    role : 'participant' | "setter" ; 
}

interface AuthContextType{
    user : User | null ; 
    token : string | null ; 
    login : (user :User , token: string)=>void ; 
    logout :()=> void ; 
    isLoading :boolean ; 
}

const AuthContest = createContext<AuthContextType | undefined>(undefined) ; 

export function AuthProvider(){

    const [user , setUser] = useState<User | null>(null) ;
    const [token , setToken] = useState<string | null>(null) ;  
    const [isLoading , setIsLoading] = useState(true) ; 

}