import { createSecretToken } from "../lib/secretToken.js";
import { TeacherData } from "../models/TeacherData.model.js"
import { StudentData } from "../models/studentData.model.js"

export const TeacherLogin = async (req, res) => {
    try {
        const { uid, password } = req.body;
        if (!uid || !password) return res.json({ message: "Fields Missing" });
        const user = await TeacherData.findOne({ uid, password }).populate("courses");
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const token = createSecretToken(user._id);

        res.status(200).json({ token: token, user: user });

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

export const StudentLogin = async (req, res) => {
    try {
        const { enroll, password } = req.body;
        if (!enroll || !password) return res.json({ message: "Fields Missing" });
        const user = await StudentData.findOne({ enroll, password });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const token = createSecretToken(user._id);

        res.status(200).json({ token: token, user: user });

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}