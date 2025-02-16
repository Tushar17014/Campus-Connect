import { Attendance } from "../models/attendance.model.js";

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