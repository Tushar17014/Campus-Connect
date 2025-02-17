import mongoose from "mongoose";
import { Courses } from "./courses.model.js";

const AttendanceRequestsSchema = new mongoose.Schema({
    enroll: {type: Number, required: true},
    uid: {type: String, required: true},
    course: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Courses"},
    date: {type: Date, required: true},
    reason: {type: String, required: true},
    proof: {type: Buffer, required: true},
    status: {type: String, enum: ["approved", "denied", "pending"], required: true, default: "pending"}
});

export const AttendanceRequests = mongoose.model("AttendanceRequests", AttendanceRequestsSchema, "AttendanceRequests");