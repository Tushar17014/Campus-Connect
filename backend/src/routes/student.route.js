import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getStudentByCourse, getStudentByEnroll, getStudentById, teachersTeachingStudent } from "../controllers/student.controller.js";

const router = Router();

router.get("/studentById/:id", getStudentById);
router.get("/studentByEnroll/:enroll", getStudentByEnroll);
router.get("/studentByCourse", getStudentByCourse);
router.get("/teachersTeachingStudent", teachersTeachingStudent)

export default router;