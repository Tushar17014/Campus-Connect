import mongoose from "mongoose";
import { Courses } from "./courses.model.js";

const LectureSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    course: {type: mongoose.Schema.Types.ObjectId, ref: "Courses", required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'TeacherData', required: true},
    isActive: {type: Boolean, default: true}
});

export const Lectures = mongoose.model("Lectures", LectureSchema, "Lectures");