import { Router } from "express";
import { getFreeSlots, scheduleExtraClass } from "../controllers/timetable.controller.js";

const router = Router();

router.get("/getFreeSlots", getFreeSlots);
router.post("/scheduleExtraClass", scheduleExtraClass);

export default router;