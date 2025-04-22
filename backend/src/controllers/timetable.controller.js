import { Courses } from "../models/courses.model.js";
import { StudentData } from "../models/studentData.model.js";
import { TeacherData } from "../models/TeacherData.model.js";
import { Timetable } from "../models/timetable.model.js";
import { sendNotification } from "./notification.controller.js"

export const getFreeSlots = async (req, res) => {
    try {
        const { batches } = req.query;

        if (!batches) {
            return res.status(400).json({ error: "Batches are required." });
        }

        // const selectedBatches = Array.isArray(batches) ? batches : batches.split(",");
        const timetable = await Timetable.find();
        if (!timetable) {
            return res.status(404).json({ error: `No timetable found` });
        }

        const freeSlotsByDay = timetable.map(daySchedule => {
            const freeTimeSlots = [];

            daySchedule.timeSlots.forEach(slot => {
                const lectures = slot.lectures;

                const isBusy = lectures.some(lecture =>
                    lecture.batch.some(batch => batches.includes(batch))
                );

                if (!isBusy && slot.time != 12) {
                    freeTimeSlots.push(slot.time);
                }
            });

            return freeTimeSlots;
        });

        return res.status(200).json(freeSlotsByDay);


    } catch (error) {
        console.error("Error finding free time slots:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const scheduleExtraClass = async (req, res) => {
    try {
        const { day, time, batches, cid, teacherUid } = req.body;

        if (!day || !time || !batches || !cid || !teacherUid) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const course = await Courses.findOne({ cid });
        const courseId = course?._id;

        const teacherData = await TeacherData.findOne({ uid: teacherUid }).select("-password");
        const teacherId = teacherData?._id;

        const timetable = await Timetable.findOne({ day });

        if (!timetable) {
            return res.status(404).json({ error: `No timetable found for ${day}` });
        }

        let timeslot = timetable.timeSlots.find(slot => slot.time === parseInt(time));

        if (!timeslot) {
            timeslot = {
                time: parseInt(time),
                lectures: []
            };
            timetable.timeSlots.push(timeslot);
        }

        timeslot.lectures.push({
            type: "EXTRA",
            batch: batches,
            course: courseId,
            teacher: teacherId
        });

        await timetable.save();

        const data = await StudentData.find().populate("courses").select("-password");
        let newData = [];
        data?.forEach(obj => {
            obj.courses?.forEach(course => {
                if (course.cid == cid) {
                    newData.push(obj);
                }
            })
        })

        await Promise.all(newData?.map( async student => {
            const expoPushToken = student.expoPushToken;
            if(expoPushToken){
                await sendNotification(expoPushToken, "Extra Class Schedule", `An Extra Class for ${course.name} on ${day} at ${time}:00 has been scheduled`);
            }
        }));

        res.json({ message: "Extra class added successfully!", newData});

    } catch (error) {
        console.error("Error adding extra class:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};