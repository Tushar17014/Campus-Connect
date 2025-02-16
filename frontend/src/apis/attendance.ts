import { axiosInstance } from "@/lib/axios";

export async function getAttendanceByCourseDate(cid: string, date: string) {
    try{
        const response = await axiosInstance.get(`/attendance/attendanceByCourseDate?cid=${cid}&date=${date}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}

export async function getAttendanceByCourse(cid: string) {
    try{
        const response = await axiosInstance.get(`/attendance/attendanceByCourse?cid=${cid}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}