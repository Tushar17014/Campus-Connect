import mongoose from "mongoose"
import { config } from "dotenv";
import { Courses } from "../models/courses.model.js";
import { TeacherData } from "../models/TeacherData.model.js";

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

updateTeacherField();