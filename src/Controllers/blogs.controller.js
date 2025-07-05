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
  if ([title, content].some((field) => field.trim() === "")) {
    throw new ApiErrors(400, "All fields should not be empty");
  }

  // Check authenticated user
  if (!req.user || !req.user._id) {
    throw new ApiErrors(401, "Unauthorized: User not authenticated");
  }

  const imageLocalPath = req.files.map((file) => file.path);

  const imageUploadPromises = imageLocalPath.map((path) =>
    uploadOnCloudinary(path)
  );
  const imageResults = await Promise.all(imageUploadPromises);
  const uploadImages = imageResults
    .filter((result) => result)
    .map((result) => result.url);

  if (uploadImages.length === 0) {
    throw new ApiErrors(500, "Failed to upload images");
  }

  const blog = await Blogs.create({
    title,
    content,
    images: uploadImages,
    blogger: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(201, blog, "Blog successfully uploaded"));
});

// get blogs by user
const getBlogsByUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiErrors(400, "User ID is required");
  }
  const blogs = await Blogs.find({ userId }).populate("userId", "name email");
  if (!blogs || blogs.length === 0) {
    throw new ApiErrors(404, "No blogs found for this user");
  }
  res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs retrieved successfully"));
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
// update blog api
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const blog = await Blogs.findById(id);
  if (!blog) {
    throw new ApiErrors(404, "Blog not found");
  }
  const imagesLocalPath = req.files.map((file) => file.path);
  const imageUploadPromises = imagesLocalPath.map((path) =>
    uploadOnCloudinary(path)
  );
  const imageResults = await Promise.all(imageUploadPromises);
  const uploadImages = imageResults
    .filter((result) => result)
    .map((result) => result.url);
  if (imageResults.length === 0) {
    throw new ApiErrors("Failed to upload images", 500);
  }
  const updateBlog = await Blogs.findByIdAndUpdate(
    { _id: id },
    {
      title: title || blog.title,
      content: content || blog.content,
      images: uploadImages || blog.images,
    },
    {
      new: true,
    }
  );
  res
    .status(200)
    .json(new ApiResponse(200, updateBlog), "Blog updated successfully");
});
// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blogs.findByIdAndDelete(id);
  if (!blog) {
    throw new ApiErrors(404, "Blog not found");
  }
  res.status(200).json(new ApiResponse(200, blog, "Blog deleted successfully"));
});
export { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog };
