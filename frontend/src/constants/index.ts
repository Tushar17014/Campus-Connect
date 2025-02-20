import { BookText, LayoutDashboard } from "lucide-react"

export const teacherSideBarList = [
    {
        title: "Dashboard",
        url: "/teacher",
        icon: LayoutDashboard,
    },
    {
        title: "Lectures",
        url: "/teacher/lectures",
        icon: BookText,
    },
]

export const studentSideBarList = [
    {
        title: "Dashboard",
        url: "/student",
        icon: LayoutDashboard,
    },
]

export const websiteTitle = "Campus Connect"