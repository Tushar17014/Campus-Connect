import mongoose from "mongoose";
import { StudentData } from "./studentData.model.js";
import { Courses } from "./courses.model.js";


const AttendanceSchema = new mongoose.Schema({
    enroll: { type: Number, required: true },
    courses: [
        {
            cid: { type: String, required: true },
            course: { type: mongoose.Schema.Types.ObjectId, ref: "Courses", required: true},
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