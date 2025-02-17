import { axiosInstance } from "@/lib/axios";

export async function getLecturesByTeacher(uid: string | null) {
    try{
        const response = await axiosInstance.get(`/lectures/teacherLectures?uid=${uid}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}