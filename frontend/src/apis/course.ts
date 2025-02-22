import { axiosInstance } from "@/lib/axios";

export async function getCourseDetails(cid: string | null) {
    try{
        const response = await axiosInstance.get(`/courses/courseDetails?cid=${cid}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}