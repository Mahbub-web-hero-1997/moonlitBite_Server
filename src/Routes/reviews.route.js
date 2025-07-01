import { Router } from "express";
import {
  createReview,
  getAllReviews,
} from "../Controllers/reviews.controller.js";
import verifyToken from "../Middlewares/verifyToken.js";

const router = Router();
router.route("/all").get(getAllReviews);
router.route("/create").post(verifyToken, createReview);
export default router;
