import User from "../Models/user.model.js";
import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import uploadOnCloudinary from "../Utils/Cloudinary.js";
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
  if(password!==confirmPassword){
    throw new ApiErrors(400, "Passwords do not match");
  }
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Please upload an avatar");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiErrors(500, "Failed to upload avatar on cloudinary");
  }
  const user = await User.create({
    fullName,
    email,
    password,   
    avatar: avatar.url,
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
const loginUser=asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    const user=await User.findOne({email})
    console.log(user);

})
export { registerUser, loginUser };
