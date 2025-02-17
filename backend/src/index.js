import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { connectDB } from './lib/db.js';
import authRoutes from "./routes/auth.route.js"
import teacherRoutes from "./routes/teacher.route.js"
import attendanceRoutes from "./routes/attendance.route.js"
import studentRoute from "./routes/student.route.js"
import announcementRoute from "./routes/announcement.route.js"
import attendanceRequestsRoute from "./routes/attendanceRequests.route.js"
import lectureRoutes from "./routes/lectures.route.js"

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentRoute);
app.use("/api/announcements", announcementRoute);
app.use("/api/attendanceRequests", attendanceRequestsRoute);
app.use("/api/lectures", lectureRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server started");
    connectDB();
})