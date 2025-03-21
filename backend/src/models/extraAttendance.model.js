import mongoose from "mongoose";
import { StudentData } from "./studentData.model.js";
import { Courses } from "./courses.model.js";


const ExtraAttendanceSchema = new mongoose.Schema({
    enroll: { type: Number, required: true },
    courses: [
        {
            course: { type: mongoose.Schema.Types.ObjectId, ref: "Courses", required: true},
            attendanceCount: { type: Number, required: true, default: 0 }
        }
    ]
});

export const ExtraAttendance =  mongoose.model('ExtraAttendance', ExtraAttendanceSchema, 'ExtraAttendance');