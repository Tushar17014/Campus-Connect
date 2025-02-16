import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { AllTeachers, getTeacherById, getTeacherByUid } from "../controllers/teacher.controller.js";

const router = Router();

router.get("/allTeachers", protectedRoute, AllTeachers);
router.get("/teacherById/:id", protectedRoute, requireTeacher, getTeacherById);
router.get("/teacherByUid/:uid", protectedRoute, requireTeacher, getTeacherByUid);

export default router;