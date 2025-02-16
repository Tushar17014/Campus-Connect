import { AppSidebar } from "@/components/sidebar/appSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  )
}

export default MainLayout
