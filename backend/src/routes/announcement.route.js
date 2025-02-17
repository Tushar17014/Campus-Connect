import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { deleteAnnouncement, getAnnouncementByTeacher, makeAnnouncement } from "../controllers/announcement.controller.js";

const router = Router();

router.get("/teacherAnnouncements", protectedRoute, getAnnouncementByTeacher);
router.post("/makeAnnouncement", protectedRoute, requireTeacher, makeAnnouncement);
router.post("/deleteAnnouncement", protectedRoute, requireTeacher, deleteAnnouncement);

export default router;