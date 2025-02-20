import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { teacherSideBarList, studentSideBarList, websiteTitle } from "@/constants"
import { Separator } from "../ui/separator"
import { NavLink, useLocation } from "react-router-dom";
import SidebarProfile from "./sidebarProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AppSideBarProp, SideBarListProps, StudentSliceProps, TeacherSliceProps } from "@/types";
import { useEffect, useState } from "react";

export function AppSidebar({ userType }: AppSideBarProp) {
  const location = useLocation();
  const [userData, setUserData] = useState<TeacherSliceProps | StudentSliceProps | null>(null);
  const [sideBarNavigation, setSideBarNavigation] = useState<SideBarListProps[] | null>(null); 
  const teacherData = useSelector((state: RootState) => state.teacherReducer);
  const studnetData = useSelector((state: RootState) => state.studentReducer);

  useEffect(() => {
    if(userType && userType != ""){
      if (userType == "teacher") {
        setUserData(teacherData);
        setSideBarNavigation(teacherSideBarList);
      }
      else if (userType == "student") {
        setUserData(studnetData);
        setSideBarNavigation(studentSideBarList);
      }
    }
  }, [userType]);

  return (
    <div>
      {userData && sideBarNavigation && (
        <Sidebar>
          <SidebarHeader className="h-24 justify-center">
            <NavLink to={userType == "teacher" ? "/teacher" : "/student"}>
              <div className="flex gap-2 items-center">
                <img src="/vite.svg" className="w-14" />
                <h1 className="text-2xl font-semibold whitespace-nowrap">{websiteTitle}</h1>
              </div>
            </NavLink>
          </SidebarHeader>
          <Separator className="mb-2" />
          <SidebarContent className="pl-2 pr-2">
            <SidebarMenu>
              {sideBarNavigation.map((item) => {
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
                )
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            {userType == "teacher" && "uid" in userData && (
              <SidebarProfile name={userData.name} userID={userData.uid} userPhoto={userData.profileImg} />
            )
          }
            {userType == "student" && "enroll" in userData && (
              <SidebarProfile name={userData.name} userID={userData.enroll} userPhoto={userData.profileImg} />
            )}
          </SidebarFooter>
        </Sidebar>
      )}
    </div>
  )
}
