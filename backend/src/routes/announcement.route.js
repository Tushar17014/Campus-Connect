import { Router } from "express";
import { protectedRoute, requireTeacher } from "../middlewares/auth.middleware.js";
import { deleteAnnouncement, getAnnouncementByTeacher, makeAnnouncement } from "../controllers/announcement.controller.js";

const router = Router();

router.get("/teacherAnnouncements", getAnnouncementByTeacher);
router.post("/makeAnnouncement", makeAnnouncement);
router.post("/deleteAnnouncement", deleteAnnouncement);

export default router;