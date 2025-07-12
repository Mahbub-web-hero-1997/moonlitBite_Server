import Menu from "../Models/menus.models.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import uploadOnCloudinary from "../Utils/Cloudinary.js";

// Get All Menus
const getAllMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find();
  if (!menus)
    return res.status(404).json(new ApiResponse(404, null, "No Menus found"));

  res.json(new ApiResponse(200, menus, "All Menus Fetched successfully"));
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
  console.log(imageLocalPaths);
  console.log("Image File Path", imageLocalPaths);
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
// get menu by Id
const GetMenuById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiErrors(400, "Invalid menu ID provided");
  }
  const menu = await Menu.findById(id);
  if (!menu) {
    throw new ApiErrors(404, "Menu not found");
  }
  res.json(new ApiResponse(200, menu, "Menu fetched successfully"));
});
// update menu
const updateMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, price, recipe } = req.body;
  let menu = await Menu.findById(id);
  if (!menu) {
    throw new ApiErrors(404, "Menu not found");
  }

  // const imageLocalPath = req.files.map((file) => file.path);
  // const imageUploadPromises = imageLocalPath.map((path) =>
  //   uploadOnCloudinary(path)
  // );
  // const imageResults = await Promise.all(imageUploadPromises);
  // const uploadImages = imageResults
  //   .filter((result) => result)
  //   .map((result) => result.url);
  // if (imageResults.length === 0) {
  //   throw new ApiErrors("Failed to upload images", 500);
  // }
  menu = await Menu.findByIdAndUpdate(id, {
    name,
    category,
    price,
    recipe,
  });
  res.status(200).json(new ApiResponse(200, menu, "Menu updated successfully"));
});

// delete menu
const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const menu = await Menu.findByIdAndDelete(id);
  if (!menu) {
    throw new ApiErrors(404, "Menu not found");
  }
  res.status(200).json(new ApiResponse(200, menu, "Menu deleted successfully"));
});
export { getAllMenus, createMenu, GetMenuById, updateMenu, deleteMenu };
