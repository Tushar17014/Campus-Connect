import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { getLectureById, getLectureByTeacher } from "../controllers/lectures.controller.js";

const router = Router();

router.get("/teacherLectures", getLectureByTeacher);

router.get("/lectureById", getLectureById);

export default router;