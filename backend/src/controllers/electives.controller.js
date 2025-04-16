import axios from "axios";
import { Courses } from "../models/courses.model.js";
import { Electives } from "../models/electives.model.js";
import { StudentData } from "../models/studentData.model.js";

export async function hasFreezedElectives(req, res, next) {
    try {
        const data = await Electives.findOne({ enroll: req.query.enroll });
        if (!data || data?.length == 0) {
            return res.status(200).json(false)
        }
        return res.status(200).json(data.has_freezed);
    } catch (err) {
        console.error(err.message);
    }
}

export async function frozenChoices(req, res, next) {
    try {
        const data = await Electives.findOne({ enroll: req.query.enroll }).populate('choice').select('choice');
        if (!data || data?.length == 0) {
            return res.status(200).json({})
        }
        let pref_count = 0;
        const output = data.choice.map(ele => {
            pref_count += 1
            return ({
                cid: ele.cid,
                name: ele.name,
                credits: ele.credit,
                preference: pref_count
            })
        });
        return res.status(200).json(output);
    } catch (err) {
        console.error(err.message);
    }
}

export async function freezeChoices(req, res, next) {
    try {
        const { enroll, choices } = req.body;
        const isRecord = await Electives.findOne({ enroll });
        if (isRecord) {
            return res.status(200).json({ message: "Already freezed Choices" });
        }

        const studentData = await StudentData.findOne({ enroll }).select("_id");

        const courses = await Promise.all(choices?.map(async (ele) => {
            const courseData = await Courses.findOne({ cid: ele.cid }).select("_id");
            return courseData?._id;
        }));

        if (!studentData || !courses) {
            return res.status(200).json({ message: "Invalid Fields" })
        }

        const output = await Electives.create({ enroll, student: studentData._id, has_freezed: true, choice: courses });

        return res.status(200).json(output);

    } catch (err) {
        console.error(err.message);
        return res.status(200).json({ error: err.message })
    }
}

export async function getSuggestion(req, res, next) {
    try {
        const { studentData } = req.body;

        const formData = new FormData();
        formData.append('studentData', studentData);

        const response = await axios.post(`${process.env.COURSE_PREDICTOR_BASE_URL}/predictCourse`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return res.status(200).json(response.data);

    } catch (err) {
        console.error(err.message);
        return res.status(200).json({ error: err.message })
    }
}