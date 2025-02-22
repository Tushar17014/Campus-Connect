import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { uploadProof } from "../middlewares/upload.middleware.js";
import { checkAttendanceRequestForStudent, createAttendanceRequest, getAttendanceRequestsForStudentByEnroll, getAttendanceRequestsForTeacherByUid, handleAttendanceRequest } from "../controllers/attendanceRequests.controller.js";

const router = Router();

router.post("/createAttendanceRequest", uploadProof.single('proof'), createAttendanceRequest)
router.get("/teacherAttendanceRequests", getAttendanceRequestsForTeacherByUid);
router.post("/handleAttendanceRequest", handleAttendanceRequest)
router.post("/checkAttendanceRequestForStudent", checkAttendanceRequestForStudent);
router.get("/studentAttendanceRequests", getAttendanceRequestsForStudentByEnroll);

export default router;