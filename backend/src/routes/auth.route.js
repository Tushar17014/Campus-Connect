import { Router } from "express";
import { StudentLogin, TeacherLogin } from "../controllers/auth.controller.js";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/teacherLogin", TeacherLogin);
router.post("/studentLogin", StudentLogin);
router.get("/test", protectedRoute, requireTeacher, (req, res) => {
    res.send("Access");
})

export default router;