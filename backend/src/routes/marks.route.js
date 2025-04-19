import { Router } from "express";
import { postMarkByEnroll } from "../controllers/marks.controller.js";

const router = Router();

router.post("/postMarkByEnroll", postMarkByEnroll);

export default router;