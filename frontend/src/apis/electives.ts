import { axiosInstance } from "@/lib/axios";
interface Course {
    cid: string
    name: string
    credits: number
    preference: number
}

export async function hasFreezedElectives(enroll: number) {
    try {
        const response = await axiosInstance.get(`/electives/hasFreezed?enroll=${enroll}`);
        return response.data;
    } catch (err: any) {
        console.error(err.message);
        return {};
    }
}

export async function getFrozenChoices(enroll: number) {
    try {
        const response = await axiosInstance.get(`/electives/frozenChoices?enroll=${enroll}`);
        return response.data;
    } catch (err: any) {
        console.error(err.message);
        return {};
    }
}

export async function freezeChoices(enroll: number, choices: Course[]) {
    try {
        const response = await axiosInstance.post(`/electives/freezeChoices`, {enroll, choices});
        return response.data;
    } catch (err: any) {
        console.error(err.message);
        return {};
    }
}

export async function getCourseSuggestion(studentData: any) {
    try {
        const response = await axiosInstance.post(`/electives/suggestion`, {studentData});
        return response.data;
    } catch (err: any) {
        console.error(err.message);
        return {};
    }
}