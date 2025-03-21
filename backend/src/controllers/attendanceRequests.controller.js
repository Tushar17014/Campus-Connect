import { AttendanceRequests } from "../models/attendanceRequests.model.js";
import { Courses } from "../models/courses.model.js";
import { ExtraAttendance } from "../models/extraAttendance.model.js";
import { StudentData } from "../models/studentData.model.js";
import { TeacherData } from "../models/TeacherData.model.js";
import { updateAttendance } from "./attendance.controller.js";
import { sendNotification } from "./notification.controller.js";

export async function createAttendanceRequest(req, res) {
    try {
        const { enroll, cid, date, reason } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Proof image is required" });
        }
        const proof = req.file.buffer;
        const CourseData = await Courses.findOne({ cid }).populate("teacher");
        if (!CourseData) return res.status(404).json({ error: "Course not found" });
        const course = CourseData._id;
        const uid = CourseData.teacher.uid;

        const data = await AttendanceRequests.create({ enroll, uid, course, date, reason, proof: proof });

        const record = await AttendanceRequests.findById(data._id).populate("course");
        const imageBase64 = record.proof ? `data:image/png;base64,${record.proof.toString("base64")}` : "";
        const studentData = await StudentData.findOne({ enroll: record.enroll });

        const output = {
            _id: record._id,
            name: studentData.name,
            enroll: record.enroll,
            profileUrl: studentData.profileUrl,
            batch: studentData.batch,
            course: record.course,
            date: record.date,
            reason: record.reason,
            proof: imageBase64,
            status: record.status
        }

        return res.status(200).json(output);
    } catch (err) {
        console.error(err.message);
    }
}
export async function getAttendanceRequestsForTeacherByUid(req, res) {
    try {
        const data = await AttendanceRequests.find({ uid: req.query.uid }).populate("course");
        let output = await Promise.all(data.map(async (record) => {
            const imageBase64 = record.proof ? `data:image/png;base64,${record.proof.toString("base64")}` : "";
            const studentData = await StudentData.findOne({ enroll: record.enroll });
            return {
                _id: record._id,
                name: studentData.name,
                enroll: record.enroll,
                profileUrl: studentData.profileUrl,
                batch: studentData.batch,
                course: record.course,
                date: record.date,
                reason: record.reason,
                proof: imageBase64,
                status: record.status
            };
        }));
        return res.status(200).json(output);
    } catch (err) {
        console.error(err.message);
    }
}

export async function handleAttendanceRequest(req, res, next) {
    try {
        const { enroll, cid, status, attendanceRequestId } = req.body;
        let canSendNotification = true;

        const studentData = await StudentData.findOne({ enroll });
        if (!studentData || !studentData.expoPushToken) {
            canSendNotification = false;
        }

        let expoPushToken = "";
        if (canSendNotification) expoPushToken = studentData.expoPushToken;

        if (status == "approved") {
            await AttendanceRequests.updateOne({ _id: attendanceRequestId }, { status });

            const course = await Courses.findOne({ cid });
            if (!course) {
                throw new Error("Course not found");
            }

            const isExtraAttendanceRecordExist = await ExtraAttendance.findOne({enroll});

            if(!isExtraAttendanceRecordExist){
                await ExtraAttendance.create({enroll, courses: []});
            }

            const result = await ExtraAttendance.findOneAndUpdate(
                { enroll, "courses.course": course._id },
                { $inc: { "courses.$.attendanceCount": 1 } },
                { new: true }
            );  

            if (!result) {
                await ExtraAttendance.findOneAndUpdate(
                    { enroll },
                    { $push: { courses: { course: course._id, attendanceCount: 1 } } },
                    { upsert: true }
                )
            }

            if (canSendNotification) await sendNotification(expoPushToken, "Attendance Approved", "Your attendance request has been approved!");

            return res.status(200).json({ message: "Approved" });
        }

        await AttendanceRequests.updateOne({ _id: attendanceRequestId }, { status: "denied" });
        if (status == "denied") {

            if (canSendNotification) await sendNotification(expoPushToken, "Attendance Denied", "Your attendance request has been denied!");

            return res.status(200).json({ message: "Denied" });
        }
        return res.status(200).json({ message: "Fulfilled" });
    } catch (err) {
        console.error(err.message);
    }
}

export async function checkAttendanceRequestForStudent(req, res, next) {
    try {
        const { enroll, cid, date } = req.body;

        const courseData = await Courses.findOne({ cid });
        const course_id = courseData?._id;

        const AttendanceRequestData = await AttendanceRequests.findOne({ enroll, date, course: course_id });

        return res.status(200).json(AttendanceRequestData ? AttendanceRequestData : false);
    } catch (err) {
        console.error(err.message);
    }
}

export async function getAttendanceRequestsForStudentByEnroll(req, res) {
    try {
        const data = await AttendanceRequests.find({ enroll: req.query.enroll }).populate("course");
        let output = await Promise.all(data.map(async (record) => {
            const imageBase64 = record.proof ? `data:image/png;base64,${record.proof.toString("base64")}` : "";
            const studentData = await StudentData.findOne({ enroll: record.enroll });
            return {
                _id: record._id,
                name: studentData.name,
                enroll: record.enroll,
                profileUrl: studentData.profileUrl,
                batch: studentData.batch,
                course: record.course,
                date: record.date,
                reason: record.reason,
                proof: imageBase64,
                status: record.status
            };
        }));
        return res.status(200).json(output);
    } catch (err) {
        console.error(err.message);
    }
}