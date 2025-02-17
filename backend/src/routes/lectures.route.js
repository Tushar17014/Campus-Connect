import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { getLectureByTeacher } from "../controllers/lectures.controller.js";

const router = Router();

router.get("/teacherLectures", getLectureByTeacher);

export default router;