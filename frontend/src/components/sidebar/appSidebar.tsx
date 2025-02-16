import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarList, websiteTitle } from "@/constants"
import { Separator } from "../ui/separator"
import {NavLink, useLocation} from "react-router-dom";
import SidebarProfile from "./sidebarProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
 
export function AppSidebar() {
  const location = useLocation();

  const userData = useSelector((state: RootState) => state.teacherReducer);

  return (
    <Sidebar>
      <SidebarHeader className="h-24 justify-center">
        <NavLink to={"/"}>
          <div className="flex gap-2 items-center">
            <img src="/vite.svg" className="w-14"/>
            <h1 className="text-2xl font-semibold whitespace-nowrap">{websiteTitle}</h1>
          </div>
        </NavLink>
      </SidebarHeader>
      <Separator className="mb-2"/>
      <SidebarContent className="pl-2 pr-2">
        <SidebarMenu>
          {sidebarList.map((item) => {
            const isLinkActive = location.pathname === item.url;
            return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="p-7" isActive={isLinkActive}>
                <NavLink to={item.url}>
                  <item.icon />
                  <span className="text-lg">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )})}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarProfile firstName={userData.firstName} lastName={userData.lastName} userID={userData.uid} userPhoto={userData.profileImg}/>
      </SidebarFooter>
    </Sidebar>
  )
}
