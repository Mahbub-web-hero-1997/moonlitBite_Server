import Blogs from "../Models/blogs.model.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import uploadOnCloudinary from "../Utils/Cloudinary.js";
// Create A blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    throw new ApiErrors(400, "All fields are required");
  }
  if ([title, content].some((field) => field.trim() == "")) {
    throw new ApiErrors(400, "All fields should not be empty");
  }
  const imageLocalPath = req.files.map((file) => file.path);

  const imageUploadPromises = imageLocalPath.map((path) =>
    uploadOnCloudinary(path)
  );
  const imageResults = await Promise.all(imageUploadPromises);
  const uploadImages = imageResults
    .filter((result) => result)
    .map((result) => result.url);
  console.log(uploadImages);
  if (imageResults.length === 0) {
    throw new ApiErrors("Failed to upload images", 500);
  }

  const blog = await Blogs.create({
    title,
    content,
    images: uploadImages,
  });
  if (imageResults.length === 0) {
    throw new ApiErrors("Failed to upload images", 500);
  }
  res
    .status(200)
    .json(new ApiResponse(201, blog, "Blog successfully uploaded"));
});
// get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blogs.find({});
  res
    .status(200)
    .json(new ApiResponse(200, blogs, "All blogs fetched successfully"));
});
// get single blog by id
const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blogs.findById(req.params.id);
  if (!blog) {
    throw new ApiErrors(404, "Blog not found");
  }
  res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});
export { createBlog, getAllBlogs, getSingleBlog };
