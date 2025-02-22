import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { getAttendanceByCourse, getAttendanceByCourseDate, getAttendanceByCourseEnroll, getAttendanceByEnroll, updateAttendanceByDate } from "../controllers/attendance.controller.js";

const router = Router();

router.get("/attendanceByCourseDate", protectedRoute, getAttendanceByCourseDate);
router.get("/attendanceByCourse", protectedRoute, getAttendanceByCourse);
router.get("/attendanceByCourseEnroll", protectedRoute, getAttendanceByCourseEnroll);
router.get("/attendanceByEnroll", getAttendanceByEnroll);

router.post("/updateAttendanceByDate", protectedRoute, updateAttendanceByDate);

export default router;