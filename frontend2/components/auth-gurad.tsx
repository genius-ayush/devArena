"use client"

import type React from "react"

// import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Code } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "participant" | "setter"
  fallbackPath?: string
}

export function AuthGuard({ children, requiredRole, fallbackPath = "/auth" }: AuthGuardProps) {
  // const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(fallbackPath)
        return
      }

      if (requiredRole && user.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user role
        const redirectPath = user.role === "setter" ? "/setter" : "/dashboard"
        router.push(redirectPath)
        return
      }
    }
  }, [user, isLoading, requiredRole, router, fallbackPath])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center border-border/40">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary animate-pulse">
              <Code className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">DevArena</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </Card>
      </div>
    )
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}
