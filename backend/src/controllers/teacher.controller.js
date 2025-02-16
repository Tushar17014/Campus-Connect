import { TeacherData } from "../models/TeacherData.model.js"

export const AllTeachers = async (req, res) => {
    try {
        const data = await TeacherData.find({}).populate("courses");
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in all teacher API", error.message);
        return res.status(400).json({error: error.message});
    }
}

export const getTeacherById = async (req, res) => {
    try {
        const data = await TeacherData.findOne({_id: req.params.id}).populate("courses");
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getTeacherById API", error.message);
        return res.status(400).json({error: error.message});
    }
}

export const getTeacherByUid = async (req, res) => {
    try {

        const data = await TeacherData.findOne({uid: req.params.uid}).populate("courses");
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in getTeacherByUid API", error.message);
        return res.status(400).json({error: error.message});
    }
}