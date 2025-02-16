import { Announcements } from "../models/announcements.model.js"
import { TeacherData } from "../models/TeacherData.model.js";

export async function getAnnouncementByTeacher(req, res) {
    try {
        const teacherData = await TeacherData.findOne({uid: req.query.uid});
        const data = await Announcements.find({author: teacherData._id}).sort({createdAt: -1});
        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
    }
}

export async function makeAnnouncement(req, res) {
    try {
        const {title, message, uid} = req.body;
        const teacherData = await TeacherData.findOne({uid});

        const author = teacherData?._id;
        const data = await Announcements.create({title, message, author});
        return res.status(200).json({data});
    } catch (err) {
        console.error(err.message);
    }
}

export async function deleteAnnouncement(req, res) {
    try {
        const {announcementID} = req.body;
        await Announcements.updateOne({_id: announcementID}, {isActive: false});
        return res.status(200).json({suucess: true});
    } catch (err) {
        console.error(err.message);
    }
}