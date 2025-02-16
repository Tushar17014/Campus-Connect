import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TeacherData } from "../models/TeacherData.model.js";
import { StudentData } from "../models/studentData.model.js";

dotenv.config();

export const protectedRoute = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        message: 'Unauthorized access - Missing Token.'
    });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.status(401).json({
            message: 'Unauthorized access - Please provide a valid token.'
        });
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', error: error.message });
    }
}

export const requireTeacher = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        message: 'Unauthorized access - Missing Token.'
    });
    try {
        const decoded = jwt.decode(token);
        const user = await TeacherData.findOne({ _id: decoded.id });
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized access - You are not a Teacher.',
                error: error.message,
            });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Cannot access this page', error: error.message });
    }
}

export const requireStudent = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        message: 'Unauthorized access - Missing Token.'
    });
    try {
        const decoded = jwt.decode(token);
        const user = await StudentData.findOne({ _id: decoded.id });
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized access - You are not a Student.',
                error: error.message,
            });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Cannot access this page', error: error.message });
    }
}