import { AppSidebar } from "@/components/sidebar/appSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useUserType } from "@/providers/contentProvider";
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  const { userType } = useUserType();

  return (
    <div>
      <SidebarProvider>
        <AppSidebar userType={userType}/>
        <Outlet />
      </SidebarProvider>
    </div>
  )
}

export default MainLayout
