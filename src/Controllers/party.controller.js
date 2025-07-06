import Party from "../Models/party.model.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import uploadOnCloudinary from "../Utils/Cloudinary.js";

const createParty = asyncHandler(async (req, res) => {
  const { title, items, description, price, status } = req.body;
  if (!title || !items || !description || !price) {
    throw new ApiErrors(400, "All fields are required");
  }
  if (
    ["title", "items", "description", "price"].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiErrors(400, "Fields cannot be empty");
  }
  const imageUrl = req.file?.path;
  if (!imageUrl) {
    throw new ApiErrors(400, "Image is required");
  }
  const image = await uploadOnCloudinary(imageUrl);
  if (!image) {
    throw new ApiErrors(500, "Failed to upload image");
  }

  const party = await Party.create({
    title,
    items,
    description,
    image: image?.url,
    price,
    status: status,
  });
  if (!party) {
    throw new ApiErrors(500, "Failed to create party");
  }
  res
    .status(201)
    .json(new ApiResponse(201, party, "Party created successfully"));
});

// get all parties
const getAllParties = asyncHandler(async (req, res) => {
  const parties = await Party.find();
  if (!parties || parties.length === 0) {
    throw new ApiErrors(404, "No parties found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, parties, "Parties fetched successfully"));
});

export { createParty, getAllParties };
