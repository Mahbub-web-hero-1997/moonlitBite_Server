import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import ApiErrors from "../utils/ApiErrors.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new ApiErrors(401, "Unauthorized: No token provided in cookie");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    const user = await User.findById(decoded.id).select("id email fullName");

    if (!user) {
      throw new ApiErrors(401, "Unauthorized: User not found");
    }

    req.user = user; 

    next();
  } catch (error) {
    next(new ApiErrors(401, "Unauthorized: Invalid or expired token"));
  }
};

export default verifyToken;
