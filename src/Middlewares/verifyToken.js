import jwt from "jsonwebtoken";
import ApiErrors from "../Utils/ApiErrors.js";

const verifyToken = (req, res, next) => {
  try {
    // Assuming your cookie name is 'token' — adjust if different
    const token = req.cookies.accessToken;

    if (!token) {
      throw new ApiErrors(401, "Unauthorized: No token provided in cookie");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    // Attach user info to req.user
    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    next(new ApiErrors(401, "Unauthorized: Invalid or expired token"));
  }
};

export default verifyToken;
