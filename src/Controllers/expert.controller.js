import Expert from "../Models/expert.model.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import uploadOnCloudinary from "../Utils/Cloudinary.js";
// Create an expert
const createExpert = asyncHandler(async (req, res) => {
  const { name, designation, bio, socialLinks } = req.body;
  if (!name || !designation || !bio) {
    throw new ApiErrors(400, "Name, designation, and bio are required fields.");
  }
  if ([name, designation, bio].some((field) => field.trim() === "")) {
    throw new ApiErrors(
      400,
      "Name, designation, and bio must be non-empty strings."
    );
  }
  const imageFilePath = req.file?.path;
  if (!imageFilePath) {
    throw new ApiErrors(400, "Image file is required.");
  }
  const image = await uploadOnCloudinary(imageFilePath);
  if (!image) {
    throw new ApiErrors(500, "Failed to upload image to Cloudinary.");
  }
  const expertData = await Expert.create({
    name,
    designation,
    bio,
    image: image.url,
    socialLinks,
  });
  res
    .status(201)
    .json(new ApiResponse(201, expertData, "Expert created successfully."));
});
// Get all expert
const getAllExperts = asyncHandler(async (req, res) => {
  const experts = await Expert.find();
  if (!experts) {
    throw new ApiErrors(404, "Expert not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, experts, "All Experts Fetched Successfully"));
});
export { createExpert, getAllExperts };
