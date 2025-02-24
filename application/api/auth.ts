import { axiosInstance } from "~/lib/axios";

export const StudentLogin = async (enroll : number, password : string) => {
    try {
        const response = await axiosInstance.post(`/auth/studentLogin`, {
            enroll,
            password
        });
        if(!response) return {data: [], statusCode: 400};
        return {data: response.data, statusCode: response.status};
    } catch (error: any) {
        console.error("Error in Student Login ", error.message);
        return null;
    }
}