import { Router } from "express";
import { getCourseDetails } from "../controllers/course.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/courseDetails", protectedRoute, getCourseDetails);

export default router;