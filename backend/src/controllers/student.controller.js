import { StudentData } from "../models/studentData.model.js";

export const getStudentById = async (req, res) => {
    try {
        const data = await StudentData.findOne({_id: req.params._id}).populate("courses");
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getTeacherById API", error.message);
        return res.status(400).json({error: error.message});
    }
}

export const getStudentByEnroll = async (req, res) => {
    try {
        const data = await StudentData.findOne({enroll: req.params.enroll}).populate("courses");
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getTeacherById API", error.message);
        return res.status(400).json({error: error.message});
    }
}

export const getStudentByCourse = async (req, res) => {
    try {
        const data = await StudentData.find().populate("courses");
        let newData = [];
        data?.forEach(obj => {
            obj.courses?.forEach(course => {
                if (course.cid == req.query.cid) {
                    newData.push(obj);
                }
            })
        })
        return res.status(200).json(newData);
    } catch (err) {
        console.error(err.message);
    }
}

export const teachersTeachingStudent = async (req, res) => {
    try {
        const studentData = await StudentData.findOne({enroll: req.query.enroll}).populate("courses").select("courses");
        let newData = [];
        studentData.courses?.forEach(obj => {
            newData.push(obj.teacher.toString());
        })
        return res.status(200).json([... new Set(newData)]);
    } catch (err) {
        console.error(err.message);
    }
}
