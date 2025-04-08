import mongoose from "mongoose";
import { Courses } from "./courses.model.js";

const StudentDataSchema = new mongoose.Schema({
    enroll: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    gender: {type: String, required: true},
    dob: {type: Date, required: true},
    password: {type: String, required: true},
    batch: {type: String, required: true},
    prevCourses: [{
        semester: {type: Number, required: true}, 
        course: {type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}
    }],
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}],
    semester: {type: Number, required: true},
    completed_credits: {type: Number, default: 0},
    profileUrl: {type: String, default: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534"},
    expoPushToken: {type: String},
});

export const StudentData = mongoose.model("StudentData", StudentDataSchema, "StudentData")