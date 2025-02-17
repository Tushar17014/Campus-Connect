import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { uploadImage, uploadProof } from "../middlewares/upload.middleware.js";
import { createAttendanceRequest, getAttendanceRequestsForTeacherByUid } from "../controllers/attendanceRequests.controller.js";

const router = Router();

router.post("/createAttendanceRequest", uploadProof.single('proof'), createAttendanceRequest)
router.get("/teacherAttendanceRequests", getAttendanceRequestsForTeacherByUid);

export default router;