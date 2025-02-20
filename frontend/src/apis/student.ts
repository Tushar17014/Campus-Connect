import { axiosInstance } from "@/lib/axios";

export const getStudentById = async (_id: string) => {
    try {
        const res = await axiosInstance.get(`/students/studentById/${_id}`);
        return { data: res.data, statusCode: res.status };
    } catch (error) {
        console.error("Error in getStudentById ", error);
        return null;
    }
}

export const getStudentByEnroll = async (enroll: number) => {
    try {
        const res = await axiosInstance.get(`/students/studentByEnroll/${enroll}`);
        return { data: res.data, statusCode: res.status };
    } catch (error) {
        console.error("Error in getStudentByEnroll ", error);
        return null;
    }
}

export async function getStudentByCourse(cid: string | null) {
    try{
        const response = await axiosInstance.get(`/students/studentByCourse?cid=${cid}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}