import mongoose from "mongoose";
import { TeacherData } from "./TeacherData.model.js";

const CoursesSchema = new mongoose.Schema({
  cid: {type: String, required: true},
  name: {type: String, required: true},
  department: {type: String, required: true},
  teacher: {type: mongoose.Types.ObjectId, required: true, ref:"TeacherData"},
  studentcount: {type: Number, required: true},
  credit: {type: Number, required: true}
});

export const Courses = mongoose.model('Courses', CoursesSchema, 'Courses');
