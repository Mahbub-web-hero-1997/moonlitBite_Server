import { Router } from "express";
import { createReview, getAllReviews } from "../Controllers/reviews.controller.js";

const router = Router();
router.route("/all").get(getAllReviews);
router.route("/create").post(createReview);
export default router;
