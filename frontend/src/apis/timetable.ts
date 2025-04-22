import { axiosInstance } from "@/lib/axios";

export async function getStudentFreeSlots(batches: string[]) {
    try{
        const response = await axiosInstance.get(`/timetable/getFreeSlots?batches=${batches}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}

export async function scheduleExtraClass(day: string, time: number, batches: string[], cid: string, teacherUid: string) {
    try{
        const response = await axiosInstance.post(`/timetable/scheduleExtraClass` , {
            day, time, batches, cid, teacherUid
        });
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}