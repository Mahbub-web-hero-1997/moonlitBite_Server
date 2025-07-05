import Story from "../Models/story.model.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";

// Create a new story
const createStory = asyncHandler(async (req, res) => {
  const { title, details, phone, email } = req.body;
  if (!title || !details || !phone || !email) {
    throw new ApiErrors(400, "All fields are required");
  }
  if ([title, details, phone, email].some((field) => field.trim() === "")) {
    throw new ApiErrors(400, "All fields should not be empty");
  }
  const story = await Story.create({
    title,
    details,
    phone,
    email,
  });
  res
    .status(201)
    .json(new ApiResponse(201, story, "Story created successfully"));
});

// get story
const getStory = asyncHandler(async (req, res) => {
  const story = await Story.find();
  if (!story || story.length === 0) {
    throw new ApiErrors(404, "No stories found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, story, "Story fetched successfully"));
});

export { createStory, getStory };
