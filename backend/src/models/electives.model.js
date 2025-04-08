import mongoose from "mongoose";
import { Courses } from "./courses.model.js";
import { StudentData } from "./studentData.model.js";

const ElectivesSchema = new mongoose.Schema({
    enroll: {type: Number, required: true, unique: true},
    student: { type: mongoose.Types.ObjectId, required: true, ref: "StudentData" },
    has_freezed: {type: Boolean, default: false},
    choice: [{ type: mongoose.Types.ObjectId, required: true, ref: "Courses" }]
});

export const Electives = mongoose.model('Electives', ElectivesSchema, 'Electives');
