import mongoose from "mongoose";
import { Courses } from "./courses.model.js";

const AnnouncementsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    message: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'TeacherData', required: true},
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true},
    isActive: {type: Boolean, required: true, default: true}
}, {timestamps: true});

export const Announcements = mongoose.model("Announcements", AnnouncementsSchema, "Announcements");