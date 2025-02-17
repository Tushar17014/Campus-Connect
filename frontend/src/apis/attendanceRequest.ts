import { axiosInstance } from "@/lib/axios";

export async function getAttendanceRequestsForTeacherByUid(uid: string | null) {
    try{
        const response = await axiosInstance.get(`/attendanceRequests/teacherAttendanceRequests?uid=${uid}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}