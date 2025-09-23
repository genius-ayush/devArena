import { AppSidebar } from "@/components/Dashboard/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4">
  <SidebarTrigger />
  <div className="flex items-center justify-center ">
    {children}
  </div>
</main>
    </SidebarProvider>
  )
}
