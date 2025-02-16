import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar"
import { Avatar } from "../ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { ChevronsUpDown, LogOut } from "lucide-react"
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"
import { SidebarProfileProps } from "@/types"


const SidebarProfile = ({firstName, lastName, userID, userPhoto} : SidebarProfileProps) => {
    const { isMobile } = useSidebar();
    const Logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };
    return (
        <div>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-10 w-10 rounded-full mr-2">
                                    <AvatarImage src={userPhoto} alt={firstName}/>
                                    <AvatarFallback className="rounded-full">{`${firstName[0]}${lastName[0]}`}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-md leading-tight">
                                    <span className="truncate font-semibold">{firstName} {lastName}</span>
                                    <span className="truncate text-sm">{userID}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuItem onClick={Logout}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </div>
    )
}

export default SidebarProfile
