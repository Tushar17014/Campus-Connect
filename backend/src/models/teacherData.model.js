import mongoose from "mongoose";
import { Courses } from "./courses.model.js";

const TeacherDataSchema = new mongoose.Schema({
    uid: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    profileImg: {type: String, required: false},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}]
});

export const TeacherData = mongoose.model("TeacherData", TeacherDataSchema, "TeacherData")