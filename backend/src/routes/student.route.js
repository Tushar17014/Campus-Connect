import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getStudentByCourse, getStudentByEnroll, getStudentById, teachersTeachingStudent } from "../controllers/student.controller.js";
import { removeExpoPushToken, saveExpoPustToken } from "../controllers/notification.controller.js";

const router = Router();

router.post("/saveExpoPushToken", saveExpoPustToken);
router.post("/removeExpoPushToken", removeExpoPushToken);

router.get("/studentById/:id", getStudentById);
router.get("/studentByEnroll/:enroll", getStudentByEnroll);
router.get("/studentByCourse", getStudentByCourse);
router.get("/teachersTeachingStudent", teachersTeachingStudent)

export default router;