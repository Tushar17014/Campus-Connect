import mongoose from "mongoose"
import { config } from "dotenv";
import { Courses } from "../models/courses.model.js";

config();

const seedTeacherData = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const courses = await Courses.find({});

    const teacher = {
        
    }

}