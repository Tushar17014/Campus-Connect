import { LucideIcon } from "lucide-react"

declare type AppSideBarProp = {
    userType: string
}

declare type SidebarProfileProps = {
    name: string,
    userID: string | number | null,
    userPhoto: string,
}

declare type SideBarListProps = {
    title: string,
    url: string,
    icon: LucideIcon
}

declare type HomeCardProps = {
    Icon: LucideIcon,
    title: string,
    content: string,
    style: string
}

declare type HomeCardGridProps = {
    userType: string,
    students?: number,
    present?: number,
    absent?: number,
    classes?: number,
    studentPresent? : number,
    studentPresentCount? : number,
    studentAbsentCount? : number,
    studentClasses? : number
}

declare type AnnouncementTableProps = {
    _id: string,
    course: CoursesProps,
    title: string,
    createdAt: Date,
    message: string,
    isActive: boolean,
    author?: TeacherSliceProps
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
    name: string,
    profileImg: string,
    isData: boolean
}

declare type AuthSliceProps = {
    userType: string;
}

declare type AttendanceRequestProps = {
    _id: string,
    name: string,
    enroll: number,
    profileUrl: string,
    batch: string,
    course: CoursesProps,
    date: Date,
    reason: string,
    proof: string,
    status: string
}

declare type AttendanceRequestTableProps = {
    data: AttendanceRequestProps[];
}

declare type LectureSummariesProps = {
    name: string,
    course: {
        cid: string,
        name: string
    },
    date: Date,
    summary: string
}

declare type LectureSummariesTableProps = {
    data: LectureSummariesProps[] | null;
}


// Student

declare type StudentSliceProps = {
    _id: string | null,
    enroll: number | null,
    name: string,
    gender: string | null,
    dob: Date | null,
    batch: string | null,
    courses: CoursesProps[] | null,
    semester: number | null,
    profileImg: string,
    isData: boolean
}

declare type StudentAttendanceRecordsProps = {
    date: Date,
    status: boolean,
    _id: string
}

declare type StudentAttendanceByEnrollData = {
    course: CoursesProps,
    attendanceRecords: StudentAttendanceRecordsProps[],
    _id: string
}

declare type StudentAllCoursesAttendanceProps = {
    course: CoursesProps,
    presentClasses: number | 0,
    totalClasses: number | 0,
    attendancePercentage: number | 0
}