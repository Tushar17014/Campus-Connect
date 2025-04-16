import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { freezeChoices, frozenChoices, getSuggestion, hasFreezedElectives } from "../controllers/electives.controller.js";

const router = Router();

router.post("/freezeChoices", freezeChoices)

router.get("/hasFreezed", hasFreezedElectives);
router.get("/frozenChoices", frozenChoices);

router.post("/suggestion", getSuggestion);

export default router;