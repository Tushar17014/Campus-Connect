import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { uploadProof } from "../middlewares/upload.middleware.js";
import { createAttendanceRequest, getAttendanceRequestsForTeacherByUid, handleAttendanceRequest } from "../controllers/attendanceRequests.controller.js";

const router = Router();

router.post("/createAttendanceRequest", uploadProof.single('proof'), createAttendanceRequest)
router.get("/teacherAttendanceRequests", getAttendanceRequestsForTeacherByUid);
router.post("/handleAttendanceRequest", handleAttendanceRequest)

export default router;