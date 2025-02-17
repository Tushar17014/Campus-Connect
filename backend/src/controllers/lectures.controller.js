import { Lectures } from "../models/lectures.model.js";
import { TeacherData } from "../models/TeacherData.model.js";

export async function getLectureByTeacher(req, res) {
    try {
        const teacherData = await TeacherData.findOne({uid: req.query.uid});
        const data = await Lectures.find({author: teacherData._id}).sort({date: -1}).populate("course");
        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
    }
}