import mongoose from "mongoose";
import { StudentData } from "./studentData.model.js";
import { Courses } from "./courses.model.js";

const CareerDataSchema = new mongoose.Schema({
    enroll: {type: Number, required: true, unique: true},
    student: [{type: mongoose.Schema.Types.ObjectId, ref: 'StudentData'}],
    interested_courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}],
    goal: {type: String, default: "Software Engineer"},
    predicted_subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}
});

export const CareerData = mongoose.model("CareerData", CareerDataSchema, "CareerData")