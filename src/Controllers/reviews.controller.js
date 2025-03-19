import Review from "../Models/reviews.model.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";

const createReview = asyncHandler(async (req, res) => {
  const { title, rating, details } = req.body;
  const reviewer = req.user._id;
  if (!title || !rating || !details) {
    throw new ApiErrors(400, "All Field are required");
  }
  if ([title, rating, details].some((field) => field.trim() === "")) {
    throw new ApiErrors(400, "Fields cannot be empty");
  }
  const review = await Review.create({
    title,
    rating,
    details,
    reviewer,
  });
  res
    .status(200)
    .json(new ApiResponse(200, review, "Review created successfully"));
});
// Get All Review
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews fetched successfully"));
});
export { createReview, getAllReviews };
