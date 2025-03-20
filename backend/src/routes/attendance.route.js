import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { getAttendanceByCourse, getAttendanceByCourseDate, getAttendanceByCourseEnroll, getAttendanceByEnroll, getTakeAttendanceRequestStatus, markAttendance, takeAttendance, updateAttendanceByDate } from "../controllers/attendance.controller.js";
import { uploadImage } from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/attendanceByCourseDate", protectedRoute, getAttendanceByCourseDate);
router.get("/attendanceByCourse", protectedRoute, getAttendanceByCourse);
router.get("/attendanceByCourseEnroll", protectedRoute, getAttendanceByCourseEnroll);
router.get("/attendanceByEnroll", getAttendanceByEnroll);

router.post("/updateAttendanceByDate", protectedRoute, updateAttendanceByDate);

router.post('/takeAttendance', uploadImage.array('image', 10), takeAttendance)
router.post('/markAttendance', markAttendance)

router.get('/takeAttendanceRequestStatus', getTakeAttendanceRequestStatus);

export default router;