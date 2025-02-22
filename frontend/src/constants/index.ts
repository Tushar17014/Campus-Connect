import { BookText, Hand, LayoutDashboard } from "lucide-react"

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
    {
        title: "Check Attendance",
        url: "/student/check-attendance",
        icon: Hand,
    },
]

export const websiteTitle = "Campus Connect"