import { axiosInstance } from "@/lib/axios";

export async function getStudentByCourse(cid: string | null) {
    try{
        const response = await axiosInstance.get(`/students/studentByCourse?cid=${cid}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}