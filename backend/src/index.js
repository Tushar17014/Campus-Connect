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
import courseRoutes from "./routes/course.route.js"
import electiveRoutes from "./routes/electives.route.js"
import marksRoutes from "./routes/marks.route.js"
import timetableRoutes from "./routes/timetable.route.js"

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:8081'
];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));

app.use(cors({
    origin: '*',
    credentials: false
}))

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentRoute);
app.use("/api/announcements", announcementRoute);
app.use("/api/attendanceRequests", attendanceRequestsRoute);
app.use("/api/lectures", lectureRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/electives", electiveRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/timetable", timetableRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server started");
    connectDB();
})