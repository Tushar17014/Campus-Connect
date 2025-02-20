import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { deleteAnnouncement, getAnnouncementByStudent, getAnnouncementByTeacher, makeAnnouncement } from "../controllers/announcement.controller.js";

const router = Router();

router.get("/teacherAnnouncements", protectedRoute, getAnnouncementByTeacher);
router.get("/studentAnnouncements", protectedRoute, getAnnouncementByStudent);
router.post("/makeAnnouncement", protectedRoute, requireTeacher, makeAnnouncement);
router.post("/deleteAnnouncement", protectedRoute, requireTeacher, deleteAnnouncement);

export default router;