import { axiosInstance } from "@/lib/axios";
import { MarksObject } from "@/types";

export async function postMarkByEnroll(enroll: number, semester: number, examEvent: string, marks: MarksObject[]) {
    try{
        const response = await axiosInstance.post(`/marks/postMarkByEnroll`, {
            enroll, semester, examEvent, marks
        });
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}