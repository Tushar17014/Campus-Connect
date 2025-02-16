import mongoose from "mongoose";

const AnnouncementsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    message: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'TeacherData', required: true},
    isActive: {type: Boolean, required: true, default: true}
}, {timestamps: true});

export const Announcements = mongoose.model("Announcements", AnnouncementsSchema, "Announcements");