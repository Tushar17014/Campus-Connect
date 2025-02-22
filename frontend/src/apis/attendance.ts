import { axiosInstance } from "@/lib/axios";

export async function getAttendanceByCourseDate(cid: string | null, date: string) {
    try{
        const response = await axiosInstance.get(`/attendance/attendanceByCourseDate?cid=${cid}&date=${date}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}

export async function getAttendanceByCourseEnroll(cid: string | null, enroll: number | null) {
    try{
        const response = await axiosInstance.get(`/attendance/attendanceByCourseEnroll?cid=${cid}&enroll=${enroll}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}

export async function getAttendanceByCourse(cid: string | null) {
    try{
        const response = await axiosInstance.get(`/attendance/attendanceByCourse?cid=${cid}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}

export async function getAttendanceByEnroll(enroll: number | null) {
    try{
        const response = await axiosInstance.get(`/attendance/attendanceByEnroll?enroll=${enroll}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}