import { Router } from "express";
import {
  createReview,
  getAllReviews,
  getMyReviews,
} from "../Controllers/reviews.controller.js";
import verifyToken from "../Middlewares/verifyToken.js";

const router = Router();
router.route("/create").post(verifyToken, createReview);
router.route("/all").get(getAllReviews);
router.route("/myReviews").get(verifyToken, getAllReviews);
export default router;
