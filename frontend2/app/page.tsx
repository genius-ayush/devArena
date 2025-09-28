import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Trophy, Users, Zap, Timer, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">DevArena</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/contests"
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
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth?mode=signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="mr-1 h-3 w-3" />
              The complete platform for competitive programming
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance">
              Code. Compete.{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Conquer.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Join thousands of developers in the ultimate coding arena. Create contests, solve challenges, and climb
              the leaderboards in real-time competitions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?role=participant">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Competing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth?role=setter">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Create Contests
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/40">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center border-border/40">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Active Developers</div>
            </Card>
            <Card className="p-6 text-center border-border/40">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Contests Hosted</div>
            </Card>
            <Card className="p-6 text-center border-border/40">
              <div className="text-2xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Problems Solved</div>
            </Card>
            <Card className="p-6 text-center border-border/40">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Live Competitions</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to excel</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for competitive programmers, by competitive programmers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Timer className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Real-time Competitions</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Live contests with instant scoring and dynamic leaderboards
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Advanced Code Editor</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Monaco-powered editor with syntax highlighting and auto-save
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Global Rankings</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Compete globally and track your progress on leaderboards
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Detailed Analytics</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Comprehensive performance insights and progress tracking
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-6 border-border/40 bg-card/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Contest</span>
                  <Badge className="status-live text-white">LIVE</Badge>
                </div>
                <h3 className="font-semibold">Algorithm Marathon</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Participants</span>
                    <span>247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Remaining</span>
                    <span className="font-mono">02:34:12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Problems</span>
                    <span>5</span>
                  </div>
                </div>
                <Button className="w-full mt-4">Join Contest</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/40">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to start your journey?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join the community of competitive programmers and take your skills to the next level.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?role=participant">
                <Button size="lg" className="w-full sm:w-auto">
                  <Users className="mr-2 h-4 w-4" />
                  Join as Participant
                </Button>
              </Link>
              <Link href="/auth?role=setter">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  <Target className="mr-2 h-4 w-4" />
                  Become a Setter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <Code className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="font-semibold">DevArena</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2025 DevArena. Built for competitive programmers.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
