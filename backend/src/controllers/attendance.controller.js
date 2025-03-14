import { fileURLToPath } from "url";
import { Attendance } from "../models/attendance.model.js";
import { AttendanceRequests } from "../models/attendanceRequests.model.js";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import { Courses } from "../models/courses.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const updateAttendance = async (enroll, cid, date) => {
    const data = await Attendance.findOne({ enroll });

    let flag = false;
    let output = {};

    data.courses?.forEach(ele => {
        if (ele.cid == cid) {
            const attendanceRecord = ele.attendanceRecords?.find(rec =>
                rec.date.toISOString() === date
            );
            if (attendanceRecord) {
                if (!attendanceRecord.status) {
                    attendanceRecord.status = true;
                    flag = true;
                }
            }
        }
    })
    if (flag) {
        data.markModified("courses");
        await data.save();
        output = await Attendance.findOne({ enroll });
    }
    return output;

}

export async function getAttendanceByCourseDate(req, res) {
    try {
        const data = await Attendance.find().populate("enroll");
        const newdata = [];
        data?.forEach(x => {
            let d = {};
            let out = null;
            let flag = false;
            x.courses?.forEach(ele => {
                if (ele.cid == req.query.cid) {
                    for (let record in ele.attendanceRecords) {
                        if (ele.attendanceRecords[record].date.toISOString() == req.query.date) {
                            out = ele.attendanceRecords[record].status;
                            flag = true;
                            break;
                        }
                    }
                }
            })
            if (flag) {
                d.enroll = x.enroll;
                d.status = out;
                newdata.push(d);
            }
        })
        return res.status(200).json(newdata);
    } catch (err) {
        console.error(err.message);
    }
}

export async function getAttendanceByCourse(req, res, next) {
    try {
        const data = await Attendance.find().lean();
        const newdata = [];
        data?.forEach(x => {
            let d = {};
            let out = [];
            let flag = false;
            x.courses?.forEach(ele => {
                if (ele.cid == req.query.cid) {
                    out = ele.attendanceRecords;
                    flag = true;
                }
            })
            if (flag) {
                d.enroll = x.enroll
                d.attendanceRecords = out;
                newdata.push(d);
            }
        })
        return res.status(200).json(newdata);
    } catch (err) {
        console.error(err.message);
    }
}

export async function getAttendanceByCourseEnroll(req, res, next) {
    try {
        const data = await Attendance.find().lean();
        let newdata = null;
        data?.forEach(x => {
            if (x.enroll == req.query.enroll) {
                for (let ele in x.courses) {
                    if (x.courses[ele].cid == req.query.cid) {
                        newdata = x.courses[ele].attendanceRecords.sort((a, b) =>
                            new Date(b.date) - new Date(a.date)
                        );
                        break;
                    }
                }
            }
        })
        return res.status(200).json(newdata ? newdata : []);
    } catch (err) {
        console.error(err.message);
    }
}

export async function updateAttendanceByDate(req, res, next) {
    try {
        const { enroll, cid, date } = req.body;
        const output = await updateAttendance(enroll, cid, date);
        return res.status(200).json(output);
    } catch (err) {
        console.error(err.message);
    }
}

export async function getAttendanceByEnroll(req, res, next) {
    try {
        const data = await Attendance.findOne({ enroll: req.query.enroll }).populate('courses.course');
        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
    }
}

export async function takeAttendance(req, res) {
    try {
        if (!req.file) {
            console.error('No file received');
            return res.status(400).send('No file uploaded');
        }
        const targetDirectory = path.resolve(__dirname, '../../')
        const imagePath = path.join(targetDirectory, req.file.path);

        const formData = new FormData();
        formData.append('image', fs.createReadStream(imagePath));
        const response = await axios.post(`${process.env.FACE_RECOGNITON_BASE_URL}/sendStudentAttendance`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        fs.unlinkSync(imagePath);

        return res.status(200).json(response?.data);

    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }
}

export async function markSingleAttendance(enroll, cid, status, today) {
    try {
        const student = await Attendance.findOne({ enroll });
        const course = await Courses.findOne({cid: cid});
        const course_id = course._id;
        if (!student) {
            const newStudent = new Attendance({
                enroll: enroll,
                courses: [
                    {
                        cid: cid, 
                        attendanceRecords: [
                            { date: today, status: status }
                        ],
                        course: course_id
                    }
                ]
            });
            await newStudent.save();
        }
        else {
            const course = student.courses.filter(course => course.cid == cid)[0];
            if (!course) {
                const newCourse = {
                    cid: cid,
                    attendanceRecords: [
                        { date: today, status: status }
                    ],
                    course: course_id
                };
                student.courses.push(newCourse);
            }
            else {
                const recordIndex = course.attendanceRecords.findIndex(record =>
                    record.date === today
                );
                if (recordIndex !== -1) {
                    course.attendanceRecords[recordIndex].status = status;
                } else {
                    course.attendanceRecords.push({ date: today, status: status });
                }
            }
            await student.save();
        }
        return true;
    } catch (error) {
        console.error('Error for enroll: ', enroll);
        console.error('Error Marking Single Attendance:', error);
        return false;
    }
}

export async function markAttendance(req, res) {
    const { attendanceData, cid } = req.body;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    try {
        attendanceData?.forEach(record => {
            let res = markSingleAttendance(record.enroll, cid, record.status, today);
            if (!res) {
                return Respond({
                    res,
                    status: 200,
                    data: { success: false }
                });
            }
        })
        return res.status(200).json({ success: true })
    } catch (error) {
        console.error('Error Marking Attendance:', error);
        res.status(500).send('Error marking attendance');
    }
}