import { axiosInstance } from "@/lib/axios"

export const getAllTeacher = async () => {
    try {
        const res = await axiosInstance.get("/teachers/allTeachers");
        return { data: res.data, statusCode: res.status };
    } catch (error) {
        console.error("Error in getAllTeacher ", error);
        return null;
    }
}

export const getTeacherById = async (_id:string) => {
    try {
        const res = await axiosInstance.get(`/teachers/teacherById/${_id}`);
        return { data: res.data, statusCode: res.status };
    } catch (error) {
        console.error("Error in getTeacherById ", error);
        return null;
    }
}

export const getTeacherByUid = async (uid:string) => {
    try {
        const res = await axiosInstance.get(`/teachers/teacherByUid/${uid}`);
        return { data: res.data, statusCode: res.status };
    } catch (error) {
        console.error("Error in getTeacherByUid ", error);
        return null;
    }
}