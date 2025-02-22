import mongoose from "mongoose"
import { config } from "dotenv";
import { Courses } from "../models/courses.model.js";
import { TeacherData } from "../models/TeacherData.model.js";
import { Attendance } from "../models/attendance.model.js";

config();
const updateTeacherField = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    try {
        // Fetch all courses
        const courses = await Courses.find();

        for (const course of courses) {
            // Find the teacher's ObjectId using the uid
            const teacher = await TeacherData.findOne({ uid: course.teacher });

            if (teacher) {
                // Update the course with the new teacher ObjectId
                await Courses.updateOne(
                    { _id: course._id },
                    { $set: { teacher: teacher._id } }
                );
                console.log(`Updated course ${course.name} with teacher ${teacher._id}`);
            } else {
                console.warn(`Teacher with UID ${course.teacher} not found`);
            }
        }

        console.log("Update complete");
        mongoose.disconnect();
    } catch (err) {
        console.error("Error updating teacher field:", err);
        mongoose.disconnect();
    }
};

const updateCourseRecord = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    try {
        const students = await Attendance.find();

        for (let student of students) {
            for (let course of student.courses) {
                const matchedCourse = await Courses.findOne({ cid: course.cid });

                if (matchedCourse) {
                    course.course = matchedCourse._id; // Assign ObjectId
                    delete course.cid; // Remove old field
                }
            }

            await student.save(); // Save updated student record
        }

        console.log("Update completed!");
        mongoose.disconnect();
    } catch (err) {
        console.error("Error updating course field:", err);
        mongoose.disconnect();
    }
}

updateCourseRecord();