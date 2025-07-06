import ApiErrors from "../Utils/ApiErrors";
import ApiResponse from "../Utils/ApiResponse";
import asyncHandler from "../Utils/AsyncHandler";

const createParty = asyncHandler(async (req, res) => {
  const { title, items, description, image, price, status } = req.body;
  if (!title || !items || !description || !image || !price) {
    throw new ApiErrors(400, "All fields are required");
  }
  if (
    ["title", "items", "description", "price"].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiErrors(400, "Fields cannot be empty");
  }
  const party = await Party.create({
    title,
    items,
    description,
    image,
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

export { createParty };
