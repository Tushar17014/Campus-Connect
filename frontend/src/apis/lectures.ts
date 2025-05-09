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

export async function getLecturesById(lectureId: string) {
    try{
        const response = await axiosInstance.get(`/lectures/lectureById?lectureId=${lectureId}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}

export async function getLecturesByStudent(enroll: number | null) {
    try{
        const response = await axiosInstance.get(`/lectures/studentLectures?enroll=${enroll}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}