import { axiosInstance } from "@/lib/axios";

export async function getAnnouncementByTeacher(uid: string | null) {
    try{
        const response = await axiosInstance.get(`/announcements/teacherAnnouncements?uid=${uid}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}

export async function makeAnnouncement(title: string, message: string, uid: string, cid: string) {
    try{
        const response = await axiosInstance.post(`/announcements/makeAnnouncement`, {
            title, message, uid, cid
        });
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}

export async function deleteAnnouncement(announcementID: string) {
    try{
        const response = await axiosInstance.post(`/announcements/deleteAnnouncement`, {
            announcementID
        });
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}

export async function getAnnouncementByStudent(enroll: number | null) {
    try{
        const response = await axiosInstance.get(`/announcements/studentAnnouncements?enroll=${enroll}`);
        return response.data;
    } catch(err: any){
        console.error(err.message);
        return {};
    }
}