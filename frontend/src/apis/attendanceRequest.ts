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

export async function handleAttendanceRequest(enroll: number, cid: string, date: Date, status: string, attendanceRequestId: string) {
    try{
        const response = await axiosInstance.post(`/attendanceRequests/handleAttendanceRequest`, {
            enroll, cid, date, status, attendanceRequestId
        });
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}