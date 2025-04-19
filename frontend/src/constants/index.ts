import { BookCheck, BookmarkCheck, BookText, Hand, LayoutDashboard, NotebookPen, SquarePen } from "lucide-react"

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
    {
        title: "Check Attendance",
        url: "/teacher/check-student-attendance",
        icon: Hand,
    },
    {
        title: "Give Marks",
        url: "/teacher/giveMarks",
        icon: SquarePen,
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
    {
        title: "Choose Electives",
        url: "/student/elective",
        icon: BookCheck,
    },
]

export const websiteTitle = "Campus Connect"

export const takeAttendanceRequestCheckInterval = 10000

export const examEvents = ["T1", "T2", "T3"]