import { Courses } from "../models/courses.model.js";

export async function getCourseDetails(req, res, next) {
    try {
        const data = await Courses.findOne({ cid: req.query.cid });
        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
    }
}