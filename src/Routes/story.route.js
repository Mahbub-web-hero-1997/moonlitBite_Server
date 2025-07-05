import { Router } from "express";
import { createStory, getStory } from "../Controllers/story.controller.js";
import verifyToken from "../Middlewares/verifyToken.js";
import authorizeRole from "../Middlewares/authorizeRole.js";

const router = Router();

router.route("/create").post(verifyToken, authorizeRole("admin"), createStory);
router.route("/get").get(getStory);

export default router;
