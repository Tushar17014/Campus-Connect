import { Lectures } from "../models/lectures.model.js";
import { StudentData } from "../models/studentData.model.js";
import { TeacherData } from "../models/TeacherData.model.js";

export async function getLectureByTeacher(req, res) {
    try {
        const teacherData = await TeacherData.findOne({ uid: req.query.uid });
        const data = await Lectures.find({ author: teacherData._id }).sort({ date: -1 }).populate("course");
        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
    }
}

export async function getLectureById(req, res) {
    try {
        const data = await Lectures.findOne({ _id: req.query.lectureId }).populate("course");
        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
    }
}

export async function getLectureByStudent(req, res) {
    try {
        const enroll = req.query.enroll;

        const studentData = await StudentData.findOne({enroll}).select('-password');
        const studentCourses = studentData.courses;

        const lectures = await Promise.all(studentCourses?.map(async courseId => {
            return await Lectures.findOne({course: courseId}).populate("course");
        }));
        
        return res.status(200).json(lectures);
    } catch (err) {
        console.error(err.message);
    }
}