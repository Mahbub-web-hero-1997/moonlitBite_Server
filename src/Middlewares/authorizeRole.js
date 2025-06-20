import ApiErrors from "../Utils/ApiErrors.js";

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiErrors(401, "Unauthorized access"));
    }
    next();
  };
};

export default authorizeRole;
