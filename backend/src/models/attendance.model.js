import mongoose from "mongoose";
import { StudentData } from "./studentData.model.js";

const AttendanceSchema = new mongoose.Schema({
    enroll: { type: Number, required: true },
    courses: [
        {
            cid: { type: String, required: true },
            attendanceRecords: [
                {
                    date: { type: Date, required: true },
                    status: { type: Boolean, required: true }
                }
            ]
        }
    ]
});

export const Attendance =  mongoose.model('Attendance', AttendanceSchema, 'Attendance');