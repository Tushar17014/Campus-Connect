import { Attendance } from "../models/attendance.model.js";
import { AttendanceRequests } from "../models/attendanceRequests.model.js";

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
                if(!attendanceRecord.status){
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

export async function updateAttendanceByDate(req, res, next) {
    try {
        const { enroll, cid, date } = req.body;
        const output = await updateAttendance(enroll, cid, date);
        return res.status(200).json(output);
    } catch (err) {
        console.error(err.message);
    }
}