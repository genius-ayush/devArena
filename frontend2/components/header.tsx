"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Code, User, LogOut, Settings, Trophy, Target } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        {/* <Link href={user?.role === "setter" ? "/setter" : "/dashboard"} className="flex items-center space-x-2"> */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Code className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">DevArena</span>
        {/* </Link> */}

        {/* {user && ( */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* {user.role === "participant" ? ( */}
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contests
                </Link>
                <Link
                  href="/leaderboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Leaderboard
                </Link>
              </>
            {/* ) : ( */}
              <>
                <Link
                  href="/setter"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/setter/contests/new"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Create Contest
                </Link>
              </>
            {/* )} */}
          </nav>
        {/* )} */}

        <div className="flex items-center space-x-4">
          {/* {user ? ( */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  {/* <span className="hidden sm:inline">{user.name}</span> */}
                  <Badge variant="secondary" className="ml-2 capitalize">
                    {/* {user.role === "participant" ? ( */}
                      <Trophy className="mr-1 h-3 w-3" />
                    {/* ) : ( */}
                      <Target className="mr-1 h-3 w-3" />
                    {/* )} */}
                    {/* {user.role} */}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem  className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          {/* ) : ( */}
            <>
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth?mode=signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          {/* )} */}
        </div>
      </div>
    </header>
  )
}
