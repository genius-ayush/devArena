"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Toast {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  description?: string
  duration?: number
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const toastStyles = {
  success: "border-green-500/20 bg-green-500/10 text-green-500",
  error: "border-red-500/20 bg-red-500/10 text-red-500",
  info: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  warning: "border-yellow-500/20 bg-yellow-500/10 text-yellow-500",
}

let toastCount = 0
const toasts: Toast[] = []
const listeners: Array<(toasts: Toast[]) => void> = []

export function toast(options: Omit<Toast, "id">) {
  const id = (++toastCount).toString()
  const newToast: Toast = {
    id,
    duration: 5000,
    ...options,
  }

  toasts.push(newToast)
  listeners.forEach((listener) => listener([...toasts]))

  if (newToast.duration && newToast.duration > 0) {
    setTimeout(() => {
      const index = toasts.findIndex((t) => t.id === id)
      if (index > -1) {
        toasts.splice(index, 1)
        listeners.forEach((listener) => listener([...toasts]))
      }
    }, newToast.duration)
  }

  return id
}

export function ToastContainer() {
  const [toastList, setToastList] = useState<Toast[]>([])

  useEffect(() => {
    listeners.push(setToastList)
    return () => {
      const index = listeners.indexOf(setToastList)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const removeToast = (id: string) => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
      listeners.forEach((listener) => listener([...toasts]))
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toastList.map((toast) => {
        const Icon = toastIcons[toast.type]
        return (
          <div
            key={toast.id}
            className={cn(
              "flex items-start space-x-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm max-w-sm",
              toastStyles[toast.type],
            )}
          >
            <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{toast.title}</p>
              {toast.description && <p className="text-sm opacity-90 mt-1">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
