import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
// import { AuthProvider } from "@/lib/auth-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { Header } from "@/components/header"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "DevArena - Competitive Programming Platform",
  description: "The ultimate platform for coding contests, challenges, and competitive programming.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ErrorBoundary>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <ToastContainer />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
