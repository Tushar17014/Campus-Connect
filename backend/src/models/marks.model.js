import mongoose from "mongoose";
import { StudentData } from "./studentData.model.js";
import { Courses } from "./courses.model.js";

const MarksSchema = new mongoose.Schema({
    enroll: { type: Number, required: true, unique: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentData' },
    marksData: [{
        semester: { type: Number, required: true },
        exams: [{
            examEvent: { type: String, required: true },
            marks: [{
                course: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses' },
                score: { type: Number, required: true }
            }]
        }]
    }],
    cgpa: { type: Number, required: true, default: 0 }
});

export const Marks = mongoose.model("Marks", MarksSchema, "Marks")