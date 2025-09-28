import { AppSidebarParticipant } from "@/components/Dashboard/app-sidebar-participant"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarParticipant/>
      <main className="flex-1 p-4">
  <SidebarTrigger />
  <div className="flex items-center justify-center ">
    {children}
  </div>
</main>
    </SidebarProvider>
  )
}
