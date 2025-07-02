import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import ApiErrors from "../Utils/ApiErrors.js";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiErrors(401, "Unauthorized: No token provided in cookie");
    }
    // console.log({ Token: token });
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    const user = await User.findById(decoded._id).select(
      "id email fullName role"
    );

    if (!user) {
      throw new ApiErrors(401, "Unauthorized: User not found");
    }

    req.user = user;
    // console.log({ user: req.user });

    next();
  } catch (error) {
    return next(
      new ApiErrors(
        error.status || 500,
        error.message || "Internal Server Error"
      )
    );
  }
};

export default verifyToken;
