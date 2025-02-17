import { AttendanceRequests } from "../models/attendanceRequests.model.js";
import { Courses } from "../models/courses.model.js";
import { StudentData } from "../models/studentData.model.js";
import { TeacherData } from "../models/TeacherData.model.js";

export async function createAttendanceRequest(req, res) {
    try {
        const {enroll, uid, cid, date, reason} = req.body;

        if(!req.file){
            return res.status(400).json({ error: "Proof image is required" });
        }
        const proof = req.file.buffer;
        const CourseData = await Courses.findOne({cid});
        if (!CourseData) return res.status(404).json({ error: "Course not found" });
        const course = CourseData._id;

        const data = await AttendanceRequests.create({enroll, uid, course, date, reason, proof: proof});

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
    }
}
export async function getAttendanceRequestsForTeacherByUid(req, res) {
    try {
        const data = await AttendanceRequests.find({uid: req.query.uid}).populate("course");
        let output = await Promise.all(data.map(async (record) => {
            const imageBase64 = record.proof ? `data:image/png;base64,${record.proof.toString("base64")}` : "";
            const studentData = await StudentData.findOne({enroll: record.enroll});
            return {
                name: studentData.name,
                enroll: record.enroll,
                profileUrl: studentData.profileUrl,
                batch: studentData.batch,
                course: record.course.name,
                date: record.date,
                reason: record.reason,
                proof: imageBase64
            };
        }));
        return res.status(200).json(output);
    } catch (err) {
        console.error(err.message);
    }
}