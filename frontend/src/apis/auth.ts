import { axiosInstance } from "@/lib/axios";

export const StudentLogin = async (enroll : number, password : string) => {
    try {
        const response = await axiosInstance.post(`/auth/studentLogin`, {
            enroll,
            password
        });
        return {data: response.data, statusCode: response.status};
    } catch (error) {
        console.error("Error in Student Login ", error);
        return null;
    }
}

export const TeacherLogin = async (uid : string, password : string) => {
    try {
        const response = await axiosInstance.post(`/auth/teacherLogin`, {
            uid,
            password
        });
        return {data: response.data, statusCode: response.status};
    } catch (error) {
        console.error("Error in Teacher Login ", error);
        return null;
    }
}