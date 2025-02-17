import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { getAttendanceByCourse, getAttendanceByCourseDate, updateAttendanceByDate } from "../controllers/attendance.controller.js";

const router = Router();

router.get("/attendanceByCourseDate", protectedRoute, getAttendanceByCourseDate);
router.get("/attendanceByCourse", protectedRoute, getAttendanceByCourse);
router.post("/updateAttendanceByDate", protectedRoute, updateAttendanceByDate);

export default router;