import mongoose from "mongoose";
import { Courses } from "./courses.model.js";

const TeacherDataSchema = new mongoose.Schema({
    uid: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    profileImg: {type: String, required: false},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}]
});

export const TeacherData = mongoose.model("TeacherData", TeacherDataSchema, "TeacherData")