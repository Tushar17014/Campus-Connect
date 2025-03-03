import { BookmarkCheck, BookText, Hand, LayoutDashboard, NotebookPen } from "lucide-react"

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
    {
        title: "Take Attendance",
        url: "/teacher/take-attendance",
        icon: NotebookPen,
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
    {
        title: "Request Attendance",
        url: "/student/request-attendance",
        icon: BookmarkCheck,
    },
]

export const websiteTitle = "Campus Connect"