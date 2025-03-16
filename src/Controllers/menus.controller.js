import uploadOnCloudinary from "../../../../../Project_For_CV/daily_lens/daily_lens_server/src/utils/cloudinary.js";
import Menu from "../Models/menus.models.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";

// Get All Menus
const getAllMenus = asyncHandler(async (req, res) => {
  try {
    const menus = await Menu.find();
    if (!menus)
      return res.status(404).json(new ApiResponse(404, null, "No Menus found"));

    res.json(new ApiResponse(200, menus, "All Menus Fetched successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create a new menu
const createMenu = asyncHandler(async (req, res) => {
  const { name, category, price, recipe } = req.body;
  if (!name || !category || !price || !recipe) {
    throw new ApiErrors("All fields are required", 400);
  }
  if ([name, category, price, recipe].some((field) => field.trim() === "")) {
    throw new ApiErrors("All fields should not be empty", 400);
  }
  const imageLocalPaths = req.files.map((file) => file.path);
  const imageUploadPromises = imageLocalPaths.map((path) =>
    uploadOnCloudinary(path)
  );
  const imageResults = await Promise.all(imageUploadPromises);
  const uploadImages = imageResults
    .filter((result) => result)
    .map((result) => result.url);
  if (imageResults.length === 0) {
    throw new ApiErrors("Failed to upload images", 500);
  }
  const menu = await Menu.create({
    name,
    category,
    price,
    recipe,
    image: uploadImages,
  });
  res.status(201).json(new ApiResponse(201, menu, "Menu created successfully"));
});

export { getAllMenus, createMenu };
