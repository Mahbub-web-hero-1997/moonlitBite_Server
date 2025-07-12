import Review from "../Models/reviews.model.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";

const createReview = asyncHandler(async (req, res) => {
  const { title, rating, details, reviewer } = req.body;
  const userId = req.user._id;
  // Fix: Corrected the if condition
  if (!title || !rating || !details) {
    throw new ApiErrors(400, "All fields are required");
  }

  // Fix: Only trim string fields to avoid errors with numbers
  if (
    [title, details, reviewer].some(
      (field) => typeof field === "string" && field.trim() === ""
    )
  ) {
    throw new ApiErrors(400, "Fields cannot be empty");
  }

  const review = await Review.create({
    title,
    rating,
    details,
    reviewer: userId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, review, "Review created successfully"));
});

// Get All Review
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate("reviewer", "fullName avatar");
  res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews fetched successfully"));
});
// Get My Reviews

const getMyReviews = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const reviews = await Review.find({ reviewer: userId }).populate(
    "reviewer",
    "fullName avatar"
  );
  res
    .status(200)
    .json(new ApiResponse(200, reviews, "My reviews fetched successfully"));
});

export { createReview, getAllReviews, getMyReviews };
