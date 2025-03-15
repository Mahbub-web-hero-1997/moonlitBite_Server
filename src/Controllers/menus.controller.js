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
const createMenu = asyncHandler(async () => {
    const {name, category, image, price, recipe}=req.body
    if(!name||!category||!image||!price||!recipe) {
        throw new ApiErrors("All fields are required", 400);
    }
    if([name,category,image,price,recipe].some(field=>field.trim()==="")){
        throw new ApiErrors("All fields should not be empty", 400);
    }
})

export { getAllMenus };
