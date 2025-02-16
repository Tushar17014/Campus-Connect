import mongoose from "mongoose";
import { Courses } from "./courses.model.js";

const StudentDataSchema = new mongoose.Schema({
    enroll: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    gender: {type: String, required: true},
    dob: {type: Date, required: true},
    password: {type: String, required: true},
    batch: {type: String, required: true},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}],
    semester: {type: Number, required: true}
});

export const StudentData = mongoose.model("StudentData", StudentDataSchema, "StudentData")