import { Router } from "express";
import { getAllReviews } from "../Controllers/reviews.controller.js";

const router = Router();
router.route("/all").get(getAllReviews);
export default router;
