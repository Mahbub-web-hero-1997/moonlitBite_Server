import User from "../Models/user.model.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import uploadOnCloudinary from "../Utils/Cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({
    validateBeforeSave: false,
  });
  return { accessToken, refreshToken };
};
// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    throw new ApiErrors(400, "All fields are required");
  }
  if (
    [fullName, email, password, confirmPassword].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiErrors(400, "All fields must not be empty");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiErrors(400, "Email already exists");
  }
  if (password !== confirmPassword) {
    throw new ApiErrors(400, "Passwords do not match");
  }
  const avatarLocalPath = req.file?.path;
  // if (!avatarLocalPath) {
  //   throw new ApiErrors(400, "Please upload an avatar");
  // }
  // const avatar = await uploadOnCloudinary(avatarLocalPath);
  // if (!avatar) {
  //   throw new ApiErrors(500, "Failed to upload avatar on cloudinary");
  // }
  const user = await User.create({
    fullName,
    email,
    password,
    // avatar: avatar.url,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );
  if (!createdUser) {
    throw new ApiErrors(500, "Failed to register user");
  }
  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiErrors(404, "User not found");
  }
  const isPasswordMatched = await user.isPasswordCorrect(password);
  if (!isPasswordMatched) {
    throw new ApiErrors(401, "Invalid Password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "Login successful"
      )
    );
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    success: true,
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "Logout successful"));
});
// get all user
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res
    .status(200)
    .json(
      new ApiResponse(200, users, `${users.length} users found successfully`)
    );
});
// get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    throw new ApiErrors(404, "User not found");
  }
  res.status(200).json(new ApiResponse(200, user, "current user fund"));
});
// update avatar
const updateProfilePicture = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Please upload an avatar");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiErrors(500, "Failed to upload avatar on cloudinary");
  }
  const updatedAvatar = await User.findByIdAndUpdate(
    userId,
    { avatar: avatar.url },
    { new: true }
  ).select("-password -refreshToken");
  if (!updatedAvatar) {
    throw new ApiErrors(404, "User not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedAvatar,
        "Profile Picture Updated Successfully"
      )
    );
});
// Update user Name
const updateName = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { fullName } = req.body;
  if (!fullName) {
    throw new ApiErrors(400, "Full Name is required");
  }
  const updatedName = await User.findByIdAndUpdate(
    userId,
    { fullName },
    { new: true }
  );
  if (!updatedName) {
    throw new ApiErrors(404, "User not found");
  }
  if (!updatedName) {
    throw new ApiErrors(500, "Failed to update name");
  }
  res
    .status(200)
    .json(new ApiResponse(200, updatedName, "Name updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUser,
  updateProfilePicture,
  updateName,
};
