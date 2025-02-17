import { LucideIcon } from "lucide-react"

declare type SidebarProfileProps = {
    firstName: string,
    lastName: string,
    userID: string | null,
    userPhoto: string,
}

declare type HomeCardProps = {
    Icon: LucideIcon,
    title: string,
    content: string,
    style: string
}

declare type HomeCardGridProps = {
    students: number,
    present: number,
    absent: number,
    classes: number
}

declare type AnnouncementTableProps = {
    _id: string,
    title: string,
    createdAt: Date,
    message: string,
    isActive: boolean
}

declare type StudentTablePropsArray = {
    data: StudentTableProps[] | null;
}

declare type StudentTableProps = {
    name: string,
    enroll: number,
    profileUrl: string,
    gender: string,
    batch: string,
    status: boolean
}

declare type CoursesProps = {
    cid: string,
    name: string,
    department: string,
    teacher: string,
    studentcount: number,
    credit: number 
}

declare type TeacherSliceProps = {
    _id: string | null,
    uid: string | null,
    courses: CoursesProps[] | null,
    firstName: string,
    lastName: string,
    profileImg: string,
    isData: boolean
}

declare type AttendanceRequestProps = {
    name: string,
    enroll: number,
    profileUrl: string,
    batch: string,
    course: string,
    date: Date,
    reason: string,
    proof: string
}

declare type AttendanceRequestTableProps = {
    data: AttendanceRequestProps[] | null;
}